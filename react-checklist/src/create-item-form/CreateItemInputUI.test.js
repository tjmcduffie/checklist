import CreateItemInputUI from './CreateItemInputUI';
import React from 'react';
import ReactDOM from 'react-dom';

it('CreateItemInputUI renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <CreateItemInputUI
      className="test"
      onChange={() => {}}
      value="test"
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
