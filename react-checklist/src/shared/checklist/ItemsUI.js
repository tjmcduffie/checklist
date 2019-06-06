import classnames from 'classnames';
import ItemUI, {SortableItem} from './ItemUI';
import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';

import './Items.css';

const ItemsUI = ({isSortable, items, onToggleIsComplete, onRemoveItem, shouldShowCompleted}) => {
  const ItemComponent = isSortable ? SortableItem : ItemUI
  return items.length > 0 ? (
    <ol className={classnames('items-list')}>
      {items.map(({description, isComplete, order, uuid}) => {
        return (!shouldShowCompleted && isComplete) ? null : (
          <ItemComponent
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

export default ItemsUI;

const SortableItemsContainer = SortableContainer(
  ({itemsProps}) => (
    <ItemsUI
      isSortable
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
