import CreateItemButtonUI from './CreateItemButtonUI';
import React from 'react';
import {create} from 'react-test-renderer';

describe('CreateItemButtonUI', () => {
  it('renders without crashing', () => {
    const elem = create(
      <CreateItemButtonUI className="test" />
    );
    elem.unmount();
  });

  describe('renders predictably', () => {
    it('when no className is provided', () => {
      const elem = create(
        <CreateItemButtonUI />
      );
      const tree = elem.toTree();
      expect(tree.rendered.props.className).toBe('grey-button');
      expect(elem.toJSON()).toMatchSnapshot();
    });

    it('when a className is provided', () => {
      const elem = create(
        <CreateItemButtonUI className="test" />
      );
      const tree = elem.toTree();
      expect(tree.rendered.props.className).toBe('grey-button test');
      expect(elem.toJSON()).toMatchSnapshot();
    });
  });
});
