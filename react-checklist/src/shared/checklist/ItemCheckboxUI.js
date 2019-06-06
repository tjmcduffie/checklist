import classnames from 'classnames';
import React from 'react';

import 'shared/checklist/ItemCheckbox.css';

const ItemCheckboxUI = ({className, isComplete, onChange, uuid}) => {
  const isCompleteClassName = isComplete ? 'item-checkbox-ui-complete' : '';
  return (
    <>
      <span
        className={classnames(className, 'item-checkbox-ui', isCompleteClassName)}
        onClick={e => onChange(uuid, isComplete)}
        onKeyPress={
          e => ((e.key === " " || e.key === "Enter") && onChange(uuid, isComplete))
        }
        tabIndex={0}
      />
      <input
        checked={isComplete}
        className={classnames('item-checkbox-input')}
        hidden={true}
        onChange={e => onChange(uuid, isComplete)}
        type="checkbox"
      />
    </>
  );
}

export default ItemCheckboxUI
