import CreateItemFormUI from 'shared/create-item-form/CreateItemFormUI';
import React, {useState} from 'react';

const CreateItemFormHooks = ({onCreate}) => {
  const [value, setValue] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    const description = value.trim();
    if (description === '') {
      return;
    }
    onCreate({
      description,
      isComplete: false,
    });
    setValue('');
  };
  const onChange = e => setValue(e.target.value);

  return (
    <CreateItemFormUI
      onChange={onChange}
      onSubmit={onSubmit}
      value={value}
    />
  );
};

export default CreateItemFormHooks;
