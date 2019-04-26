import ChecklistCreateItemForm from './create-item-form/CreateItemForm';
import ChecklistItems from './checklist/Items';
import classnames from 'classnames';
import * as db from './util/LocalDataAPI';
import React, { useCallback, useEffect, useState } from 'react';


import './App.css';
import './util/Button.css';
import './util/Flex.css';

const App = () => {
  const [errors, setErrors] = useState([]);
  const [items, setItems] = useState([]);
  const [shouldShowCompleted, setShouldShowCompleted] = useState(true);

  const onCreate = (item) => db.create(item)
    .then(uuid => db.findByUuid(uuid))
    .then(dbItem => setItems(items.concat(dbItem)))
    .catch(onPromiseRejection);

  const onPromiseRejection = useCallback(e => setErrors(errors.concat(e.message)), [errors]);

  const onToggleIsComplete = (uuid, prevIsChecked) => db.update(uuid, {isComplete: !prevIsChecked})
    .then(updated => {
      if (updated === 0) {
        throw new Error(`${uuid} could not be updated as it could not be found`);
      }
      return db.findByUuid(uuid);
    })
    .then(dbItem => setItems(items.map(item => item.uuid !== uuid ? item : dbItem)))
    .catch(onPromiseRejection);

  const onRemoveItem = uuid => db.remove(uuid)
    .then(setItems(items.filter(item => item.uuid !== uuid)))
    .catch(onPromiseRejection);

  const onToggleCompleted = () => db.putMetadata('shouldShowCompleted', !shouldShowCompleted)
    .then(() => setShouldShowCompleted(!shouldShowCompleted));

  useEffect(() => {
    db.findAll().then(items => setItems(items));
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
      <header className={classnames('flex-row')}>
        <h1 className={classnames('flex-grow')}>Checklist</h1>
        <button
          className={classnames('clear-button', 'monospaced-button', 'flex-shrink', 'flex-align-center')}
          onClick={onToggleCompleted}
          onKeyPress={
            e => ((e.key === " " || e.key === "Enter") && onToggleCompleted())
          }>
          {shouldShowCompleted ? 'Hide completed' : 'Show completed'}
        </button>
      </header>
      <main>
        <ChecklistItems
          items={items}
          onToggleIsComplete={onToggleIsComplete}
          onRemoveItem={onRemoveItem}
          shouldShowCompleted={shouldShowCompleted}
        />
        <ChecklistCreateItemForm onCreate={onCreate} />
      </main>
    </div>
  );
};

export default App;
