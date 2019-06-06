import CreateItemFormHooks from './CreateItemFormHooks';
import {SortableItems as ChecklistItems} from '../shared/checklist/ItemsUI';
import Header from '../shared/chrome/Header';
import * as db from '../shared/util/LocalDataAPI';
import React, { useCallback, useEffect, useState } from 'react';

import '../shared/chrome/css/App.css';
import '../shared/base/css/Button.css';
import '../shared/base/css/Flex.css';

const App = () => {
  const [errors, setErrors] = useState([]);
  const [items, setItems] = useState([]);
  const [shouldShowCompleted, setShouldShowCompleted] = useState(true);

  const onPromiseRejection = useCallback(e => setErrors(errors.concat(e.message)), [errors]);

  const onCreate = useCallback(
    (item) => db.create(item)
      .then(uuid => db.findByUuid(uuid))
      .then(dbItem => setItems(items.concat(dbItem)))
      .catch(onPromiseRejection),
    [items, onPromiseRejection],
  );

  const onToggleIsComplete = useCallback(
    (uuid, prevIsChecked) => db.update(uuid, {isComplete: !prevIsChecked})
      .then(updated => {
        if (updated === 0) {
          throw new Error(`${uuid} could not be updated as it could not be found`);
        }
        return db.findByUuid(uuid);
      })
      .then(dbItem => setItems(items.map(item => item.uuid !== uuid ? item : dbItem)))
      .catch(onPromiseRejection),
    [items, onPromiseRejection],
  );

  const onRemoveItem = useCallback(
    uuid => db.remove(uuid)
      .then(setItems(items.filter(item => item.uuid !== uuid)))
      .catch(onPromiseRejection),
    [items, onPromiseRejection],
  );

  const onSortEnd = useCallback(
    ({oldIndex, newIndex}) => {
      const canUseNewLogic = false;
      if (canUseNewLogic) {
        console.time('onSortEnd.new.stateUpdate');
        const start = oldIndex < newIndex ? oldIndex : newIndex;
        const end = oldIndex > newIndex ? oldIndex : newIndex;
        const adjustment = oldIndex > newIndex ? 1 : -1;
        const updates = [];
        const newItems = items
          .map(item => {
            const newItem = Object.assign({}, item);
            if (newItem.order === oldIndex) {
              newItem.order = newIndex;
              updates.push(newItem);
            } else if (newItem.order >= start && newItem.order <= end ) {
              newItem.order += adjustment;
              updates.push(newItem);
            }
            return newItem;
          })
          .sort(({order: orderA}, {order: orderB}) => (orderA - orderB));
        setItems(newItems);
        console.timeEnd('onSortEnd.new.stateUpdate');
        console.time('onSortEnd.new.dbSync');
        db.bulkUpdate(updates.map(
          ({uuid, order}) => ([uuid, {order}])
        ))
          .then(values => {
            // after updates are complete, re-update the state to keep state and the db in sync
            newItems.splice(start, values.length, ...values);
            setItems(newItems);
            console.timeEnd('onSortEnd.new.dbSync');
          })
          .catch(onPromiseRejection);
      } else {
        console.time('onSortEnd.stateUpdate');
        const from = items.findIndex(item => (item.order === oldIndex));
        const to = items.findIndex(item => (item.order === newIndex));
        const start = from < to ? from : to;
        const end = from > to ? from : to;
        // clone the list of items and extract the items that need to be updated
        const itemsCopy = items.slice();
        const itemsToMove = itemsCopy.slice(start, end + 1);
        // relocate the item in the array
        // might be easiest to sort the array after updating the order values
        ((array, from, to) => {
          array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0])
        })(itemsToMove, from < to ? 0 : itemsToMove.length - 1, from > to ? 0 : itemsToMove.length - 1)
        // update the order & replace the corresponding segment of the items list
        itemsToMove.forEach((item, index) => {item.order = start + index; return item});
        itemsCopy.splice(start, itemsToMove.length, ...itemsToMove);
        // update state
        setItems(itemsCopy);
        console.timeEnd('onSortEnd.stateUpdate');

        // update the results in the db
        console.time('onSortEnd.dbSync');
        db.bulkUpdate(itemsToMove.map(
          // extract the updated order
          ({uuid, order}, index) => ([uuid, {order: start + index}])
        ))
          .then(values => {
            // after updates are complete, re-update the state to keep state and the db in sync
            itemsCopy.splice(start, values.length, ...values);
            setItems(itemsCopy);
            console.timeEnd('onSortEnd.dbSync');
          })
          .catch(onPromiseRejection);
      }
    },
    [items, onPromiseRejection],
  );

  const onToggleCompleted = useCallback(
    () => db.putMetadata('shouldShowCompleted', !shouldShowCompleted)
      .then(() => setShouldShowCompleted(!shouldShowCompleted)),
    [shouldShowCompleted]
  );

  useEffect(() => {
    db.findAll('order').then(items => setItems(items));
    db.findMetadata('shouldShowCompleted')
      .then(shouldShow => {
        setShouldShowCompleted(shouldShow != null ? shouldShow : true);
        if (shouldShow == null) {
          db.putMetadata('shouldShowCompleted', true);
        }
      })
      // if the get fails, its because we haven't set the value.
      .catch(onPromiseRejection);
  }, [onPromiseRejection]);

  return (
    <div className="app">
      <Header
        onToggleShowCompleted={onToggleCompleted}
        shouldShowCompleted={shouldShowCompleted}
      />
      <main>
        <ChecklistItems
          items={items}
          onToggleIsComplete={onToggleIsComplete}
          onRemoveItem={onRemoveItem}
          onSortEnd={onSortEnd}
          shouldShowCompleted={shouldShowCompleted}
        />
        <CreateItemFormHooks onCreate={onCreate} />
      </main>
    </div>
  );
};

export default App;
