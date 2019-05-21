import Item from './ItemUI';
import React from 'react';
import ReactDOM from 'react-dom';

it('Item renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Item
      description="test"
      isComplete={false}
      onChange={() => {}}
      onRemove={() => {}}
      uuid="asdfasdf"
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
