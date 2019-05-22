import ItemsUI from './ItemsUI';
import React from 'react';
import ReactDOM from 'react-dom';
import {create} from 'react-test-renderer';

describe('ItemsUI', () => {
  const noop = () => {};
  const items = [
    {description: 'one', isComplete: false, uuid: 'asdfasdf'},
    {description: 'two', isComplete: true, uuid: 'qwerqwer'},
    {description: 'three', isComplete: false, uuid: 'zxcvzxcv'},
  ];

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ItemsUI items={items} onToggleIsComplete={noop} onRemoveItem={noop} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('renders predictably', () => {
    it('when showing all items', () => {
      const elem = create(
        <ItemsUI items={items} onToggleIsComplete={noop} onRemoveItem={noop} shouldShowCompleted={true} />
      );
      const tree = elem.toTree();
      expect(tree.rendered.rendered.length).toBe(3);
      expect(tree.rendered.rendered[0].props.uuid).toBe('asdfasdf');
      expect(tree.rendered.rendered[1].props.uuid).toBe('qwerqwer');
      expect(tree.rendered.rendered[2].props.uuid).toBe('zxcvzxcv');
      expect(elem.toJSON()).toMatchSnapshot();
    });

    it('when showing only incomplete items', () => {
      const elem = create(
        <ItemsUI items={items} onToggleIsComplete={noop} onRemoveItem={noop} shouldShowCompleted={false} />
      );
      const tree = elem.toTree();
      expect(tree.rendered.rendered.length).toBe(2);
      expect(tree.rendered.rendered[0].props.uuid).toBe('asdfasdf');
      expect(tree.rendered.rendered[1].props.uuid).toBe('zxcvzxcv');
      expect(elem.toJSON()).toMatchSnapshot();
    });
  });
});
