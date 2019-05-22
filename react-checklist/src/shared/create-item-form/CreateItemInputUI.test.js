import CreateItemInputUI from './CreateItemInputUI';
import React from 'react';
import ReactDOM from 'react-dom';
import {create} from 'react-test-renderer';

describe('CreateItemInputUI', () => {
  const noop = () => {};

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <CreateItemInputUI className="test" onChange={noop} value="test" />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('renders predictably', () => {
    it('when no className is provided', () => {
      const elem = create(
        <CreateItemInputUI onChange={noop} value="test" />
      );
      const tree = elem.toTree();
      expect(tree.rendered.props.className).toBe('create-item-input');
      expect(elem.toJSON()).toMatchSnapshot();
    });

    it('when a className is provided', () => {
      const elem = create(
        <CreateItemInputUI className="test" onChange={noop} value="test" />
      );
      const tree = elem.toTree();
      expect(tree.rendered.props.className).toBe('create-item-input test');
      expect(elem.toJSON()).toMatchSnapshot();
    });
  });
});
