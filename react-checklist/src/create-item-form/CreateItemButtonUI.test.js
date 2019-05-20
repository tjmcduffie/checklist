import React from 'react';
import ReactDOM from 'react-dom';
import CreateItemButtonUI from './CreateItemButtonUI';

it('CreateItemButtonUI renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateItemButtonUI className="test" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
