import CreateItemFormUI from './CreateItemFormUI';
import React from 'react';
import ReactDOM from 'react-dom';

it('CreateItemFormUI renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <CreateItemFormUI
      onChange={() => {}}
      onSubmit={() => {}}
      value=""
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});