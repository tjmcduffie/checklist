import CreateItemInputUI from './CreateItemInputUI';
import React from 'react';
import {create} from 'react-test-renderer';

describe('CreateItemInputUI', () => {
  const noop = () => {};

  it('renders without crashing', () => {
    const elem = create(
      <CreateItemInputUI className="test" onChange={noop} value="test" />
    );
    elem.unmount();
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
