import CreateItemButtonUI from './CreateItemButtonUI';
import React from 'react';
import ReactDOM from 'react-dom';
import {create} from 'react-test-renderer';

describe('CreateItemButtonUI', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <CreateItemButtonUI className="test" />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
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
