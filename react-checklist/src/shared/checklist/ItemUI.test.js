import ItemUI from './ItemUI';
import React from 'react';
import {create} from 'react-test-renderer';

jest.mock('./ItemCheckboxUI', () => 'ItemCheckboxUI');

describe('ItemUI', () => {
  const noop = () => {};

  it('renders without crashing', () => {
    const elem = create(
      <ItemUI description="test" isComplete={false} onChange={noop} onRemove={noop} uuid="asdfasdf" />
    );
    elem.unmount();
  });

  describe('renders predictably', () => {
    it('when complete', () => {
      const elem = create(
        <ItemUI description="one" isComplete={false} onChange={noop} onRemove={noop} uuid="asdfasdf" />
      );
      const tree = elem.toTree();
      expect(tree.rendered.rendered.length).toBe(3);
      expect(tree.rendered.rendered[0].props.isComplete).toBe(false);
      expect(elem.toJSON()).toMatchSnapshot();
    });

    it('when incomplete', () => {
      const elem = create(
        <ItemUI description="one" isComplete={true} onChange={noop} onRemove={noop} uuid="asdfasdf" />
      );
      const tree = elem.toTree();
      expect(tree.rendered.rendered.length).toBe(3);
      expect(tree.rendered.rendered[0].props.isComplete).toBe(true);
      expect(elem.toJSON()).toMatchSnapshot();
    });
  });
});
