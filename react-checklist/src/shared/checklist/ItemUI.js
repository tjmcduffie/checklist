import classnames from 'classnames';
import ItemCheckbox from './ItemCheckboxUI';
import React from 'react';

import '../base/css/Button.css';
import '../base/css/Flex.css';
import './Item.css';

const ItemUI = ({description, isComplete, onChange, onRemove, uuid}) => {
  const descriptionClassName = isComplete ? 'item-description-complete' : 'item-description';
  return (
    <li className={classnames('item', 'flex-row')}>
      <ItemCheckbox
        className={classnames('flex-auto')}
        isComplete={isComplete}
        onChange={onChange}
        uuid={uuid}
      />
      <span className={classnames(descriptionClassName, 'flex-grow', 'flex-align-center')}>
        {description}
      </span>
      <button
        className={classnames('clear-button', 'monospaced-button', 'flex-shrink', 'flex-align-top')}
        onClick={_ => onRemove(uuid)}
        onKeyPress={
          e => ((e.key === " " || e.key === "Enter") && onRemove(uuid))
        }>
        delete
      </button>
    </li>
  );
}

export default ItemUI;
