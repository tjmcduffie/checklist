import CreateItemFormUI from './CreateItemFormUI';
import React from 'react';
import ReactDOM from 'react-dom';
import {create} from 'react-test-renderer';

describe('CreateItemFormUI', () => {
  const noop = () => {};

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <CreateItemFormUI onChange={noop} onSubmit={noop} value="" />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders predictably', () => {
    const elem = create(<CreateItemFormUI onChange={noop} onSubmit={noop} value="" />);
    expect(elem.toJSON()).toMatchSnapshot();
  });
});
