import classnames from 'classnames';
import Item from './Item';
import React from 'react';

import './Items.css';

const Items = ({items, onToggleIsComplete, onRemoveItem, shouldShowCompleted}) => {
  return items.length > 0 ? (
    <ol className={classnames('items-list')}>
      {items.map(({description, isComplete, uuid}) => {
        return (!shouldShowCompleted && isComplete) ? null : (
          <Item
            description={description}
            isComplete={isComplete}
            key={uuid}
            onChange={onToggleIsComplete}
            onRemove={onRemoveItem}
            uuid={uuid}
          />
        );
      })}
    </ol>
  ) : null;
};

export default Items;
