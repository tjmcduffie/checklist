import React from 'react';
import ReactDOM from 'react-dom';
import ItemCheckbox from './ItemCheckbox';

it('ItemCheckbox renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ItemCheckbox
      className="test"
      isComplete={false}
      onChange={() => {}}
      uuid="asdfasdf"
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
