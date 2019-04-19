import classnames from 'classnames';
import React from 'react';

import '../util/Button.css';

const CreateItemButton = ({className}) => {
  return (
    <button
      className={classnames('grey-button', className)}
      type="submit">
      Add
    </button>
  );
}

export default CreateItemButton;
