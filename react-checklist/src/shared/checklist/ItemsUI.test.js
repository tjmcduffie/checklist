import ItemsUI from './ItemsUI';
import React from 'react';
import ReactDOM from 'react-dom';

it('ItemsUI renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ItemsUI
      items={[{description: 'test', isComplete: false, uuid: 'asdfasdf'}]}
      onToggleIsComplete={() => {}}
      onRemoveItem={() => {}}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});