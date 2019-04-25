import React from 'react';
import ReactDOM from 'react-dom';
import CreateItemForm from './CreateItemForm';

it('CreateItemForm renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateItemForm onChange={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
