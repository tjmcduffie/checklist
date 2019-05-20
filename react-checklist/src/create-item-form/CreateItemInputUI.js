import classnames from 'classnames';
import React from 'react';
import './CreateItemInput.css';

const CreateItemInputUI = ({className, onChange, value}) => {
  return (
    <input
      className={classnames('create-item-input', className)}
      id="description"
      onChange={onChange}
      type="text"
      value={value}
    />
  );
}

export default CreateItemInputUI;
