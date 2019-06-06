import classnames from 'classnames';
import ItemCheckbox from 'shared/checklist/ItemCheckboxUI';
import React from 'react';
import {
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';

import 'shared/base/css/Button.css';
import 'shared/base/css/Flex.css';
import 'shared/checklist/Item.css';

const ItemUI = ({
  beforeContent,
  description,
  isComplete,
  onChange,
  onRemove,
  uuid
}) => {
  const descriptionClassName = isComplete ? 'item-description-complete' : 'item-description';
  return (
    <li className={classnames('item', 'flex-row')}>
      {beforeContent && (
        <span className={classnames('flex-shrink', 'flex-align-top')}>
          {beforeContent}
        </span>
      )}
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

const Handle = SortableHandle(props => (
  <span className={classnames('item-sort-handle', 'flat-button')} tabIndex={0}>
    ::
  </span>
));

export const SortableItem = SortableElement(
  props => (<ItemUI {...props} beforeContent={<Handle />} />)
);
