import classnames from 'classnames';
import CreateItemButtonUI from 'shared/create-item-form/CreateItemButtonUI';
import CreateItemInputUI from 'shared/create-item-form/CreateItemInputUI';
import React from 'react';

import 'shared/base/css/Flex.css';
import 'shared/base/css/Spacing.css';

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
