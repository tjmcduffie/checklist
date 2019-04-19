import classnames from 'classnames';
import Item from './Item';
import React from 'react';

import './Items.css';

const Items = ({items, onToggleIsComplete, onRemoveItem}) => {
  return items.length > 0 ? (
    <ol className={classnames('items-list')}>
      {items.map(({description, isComplete, uuid}) => {
        return (
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
