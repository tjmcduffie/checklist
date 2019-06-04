import CreateItemFormUI from '../shared/create-item-form/CreateItemFormUI';
import React, {useState} from 'react';

const CreateItemFormHooks = ({onCreate}) => {
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
  const onChange = e => setValue(e.target.value.trim());

  return (
    <CreateItemFormUI
      onChange={onChange}
      onSubmit={onSubmit}
      value={value}
    />
  );
};

export default CreateItemFormHooks;
