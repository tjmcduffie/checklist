import classnames from 'classnames';
import CreateItemButtonUI from './CreateItemButtonUI';
import CreateItemInputUI from './CreateItemInputUI';
import React from 'react';

import '../base/css/Flex.css';
import '../base/css/Spacing.css';

const CreateItemFormUI = ({onChange, onSubmit, value}) => (
  <form
    className={classnames('flex-row')}
    onSubmit={onSubmit}>
    <CreateItemInputUI
      className={classnames('flex-grow', 'space-after-regular')}
      onChange={onChange}
      value={value}
    />
    <CreateItemButtonUI className="flex-shrink" />
  </form>
);

export default CreateItemFormUI;
