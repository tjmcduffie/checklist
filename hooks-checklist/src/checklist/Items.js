import classnames from 'classnames';
import {SortableItem as Item} from './Item';
import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';

import './Items.css';

const Items = ({items, onToggleIsComplete, onRemoveItem, shouldShowCompleted}) => {
  return items.length > 0 ? (
    <ol className={classnames('items-list')}>
      {items.map(({description, isComplete, order, uuid}) => {
        return (!shouldShowCompleted && isComplete) ? null : (
          <Item
            description={description}
            index={order}
            isComplete={isComplete}
            key={uuid}
            onChange={onToggleIsComplete}
            onRemove={onRemoveItem}
            uuid={uuid}
          />
        );
      })}
    </ol>
  ) : <ol />;
};

export default Items;

const SortableItemsContainer = SortableContainer(
  ({itemsProps}) => (
    <Items
      {...itemsProps}
    />
  )
);

export const SortableItems = ({onSortEnd, ...itemsProps}) => (
  <SortableItemsContainer
    itemsProps={itemsProps}
    onSortEnd={onSortEnd}
    useDragHandle
    lockAxis="y"
  />
);
