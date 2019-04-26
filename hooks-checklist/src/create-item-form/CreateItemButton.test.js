import React from 'react';
import ReactDOM from 'react-dom';
import CreateItemButton from './CreateItemButton';

it('CreateItemButton renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateItemButton className="test" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
