import React from 'react';
import ReactDOM from 'react-dom';
import ItemCheckboxUI from './ItemCheckboxUI';

it('ItemCheckboxUI renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ItemCheckboxUI
      className="test"
      isComplete={false}
      onChange={() => {}}
      uuid="asdfasdf"
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
