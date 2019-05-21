import CreateItemButtonUI from './CreateItemButtonUI';
import React from 'react';
import ReactDOM from 'react-dom';

it('CreateItemButtonUI renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateItemButtonUI className="test" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
