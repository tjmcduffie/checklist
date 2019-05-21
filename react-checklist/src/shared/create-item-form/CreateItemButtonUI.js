import classnames from 'classnames';
import React from 'react';

import '../base/css/Button.css';

const CreateItemButtonUI = ({className}) => {
  return (
    <button
      className={classnames('grey-button', className)}
      type="submit">
      Add
    </button>
  );
}

export default CreateItemButtonUI;
