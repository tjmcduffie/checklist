import React from 'react';
import ReactDOM from 'react-dom';
import CreateItemFormClass from './CreateItemFormClass';

it('CreateItemFormClass renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateItemFormClass onCreate={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
