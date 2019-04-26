import React from 'react';
import ReactDOM from 'react-dom';
import CreateItemInput from './CreateItemInput';

it('CreateItemInput renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <CreateItemInput
      className="test"
      onChange={() => {}}
      value="test"
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
