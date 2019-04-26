import classnames from 'classnames';
import CreateItemButton from './CreateItemButton';
import CreateItemInput from './CreateItemInput';
import React, { useState } from 'react';
import '../util/Flex.css';
import '../util/Spacing.css';

const CreateItemForm = ({onCreate}) => {
  const [value, setValue] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    if (value === '') {
      return;
    }
    onCreate({
      description: value,
      isComplete: false,
    });
    setValue('');
  };

  return (
    <form
      className={classnames('flex-row')}
      onSubmit={onSubmit}>
      <CreateItemInput
        className={classnames('flex-grow', 'space-after-regular')}
        onChange={e => setValue(e.target.value.trim())}
        value={value}
      />
      <CreateItemButton className="flex-shrink" />
    </form>
  );
};

export default CreateItemForm;
