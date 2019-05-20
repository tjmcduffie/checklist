import React from 'react';
import ReactDOM from 'react-dom';
import CreateItemInputUI from './CreateItemInputUI';

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
