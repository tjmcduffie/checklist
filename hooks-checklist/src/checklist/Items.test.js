import React from 'react';
import ReactDOM from 'react-dom';
import Items from './Items';

it('Items renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Items
      items={[{description: 'test', isComplete: false, uuid: 'asdfasdf'}]}
      onToggleIsComplete={() => {}}
      onRemoveItem={() => {}}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
