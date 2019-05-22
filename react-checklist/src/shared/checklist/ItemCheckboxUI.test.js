import {shallow} from 'enzyme';
import ItemCheckboxUI from './ItemCheckboxUI';
import React from 'react';
import ReactDOM from 'react-dom';
import {create} from 'react-test-renderer';

describe('ItemCheckboxUI', () => {
  const noop = () => {};

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ItemCheckboxUI className="test" isComplete={false} onChange={noop} uuid="asdfasdf" />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('renders predictably', () => {
    it('when incomplete', () => {
      const elem = create(
        <ItemCheckboxUI isComplete={false} onChange={noop} uuid="asdfasdf" />
      );
      const tree = elem.toTree();
      expect(tree.rendered[1].props.checked).toBe(false);
      expect(elem.toJSON()).toMatchSnapshot();
    });

    it('when complete', () => {
      const elem = create(
        <ItemCheckboxUI isComplete={true} onChange={noop} uuid="asdfasdf" />
      );
      const tree = elem.toTree();
      expect(tree.rendered[0].props.className).toContain('item-checkbox-ui-complete');
      expect(tree.rendered[1].props.checked).toBe(true);
      expect(elem.toJSON()).toMatchSnapshot();
    });

    it('when supplied a classname', () => {
      const elem = create(
        <ItemCheckboxUI className="foo" isComplete={false} onChange={noop} uuid="asdfasdf" />
      );
      const tree = elem.toTree();
      expect(tree.rendered[0].props.className).toContain('foo');
      expect(elem.toJSON()).toMatchSnapshot();
    });
  });

  describe('handles events', () => {
    const mockOnChange = jest.fn();

    afterEach(() => {
      mockOnChange.mockReset();
    });

    it('handles clicks on the checkbox', () => {
      const elem = shallow(
        <ItemCheckboxUI isComplete={false} onChange={mockOnChange} uuid="asdfasdf" />
      );
      elem.find('span').prop('onClick')();
      expect(mockOnChange.mock.calls.length).toBe(1);
      expect(mockOnChange.mock.calls[0][0]).toBe('asdfasdf');
      expect(mockOnChange.mock.calls[0][1]).toBe(false);

      mockOnChange.mockReset();
      elem.setProps({isComplete: true});
      elem.find('span').prop('onClick')();
      expect(mockOnChange.mock.calls.length).toBe(1);
      expect(mockOnChange.mock.calls[0][0]).toBe('asdfasdf');
      expect(mockOnChange.mock.calls[0][1]).toBe(true);
    });

    it('handles keypresses on the checkbox', () => {
      const elem = shallow(
        <ItemCheckboxUI isComplete={false} onChange={mockOnChange} uuid="asdfasdf" />
      );
      elem.find('span').prop('onKeyPress')({key: ' '});
      expect(mockOnChange.mock.calls.length).toBe(1);
      expect(mockOnChange.mock.calls[0][0]).toBe('asdfasdf');
      expect(mockOnChange.mock.calls[0][1]).toBe(false);

      mockOnChange.mockReset();
      elem.find('span').prop('onKeyPress')({key: 'Enter'});
      expect(mockOnChange.mock.calls.length).toBe(1);
      expect(mockOnChange.mock.calls[0][0]).toBe('asdfasdf');
      expect(mockOnChange.mock.calls[0][1]).toBe(false);

      mockOnChange.mockReset();
      elem.find('span').prop('onKeyPress')({key: 'tab'});
      expect(mockOnChange.mock.calls.length).toBe(0);
    });

    it('handles change events on the checkbox', () => {
      const elem = shallow(
        <ItemCheckboxUI isComplete={false} onChange={mockOnChange} uuid="asdfasdf" />
      );
      elem.find('input').prop('onChange')();
      expect(mockOnChange.mock.calls.length).toBe(1);
      expect(mockOnChange.mock.calls[0][0]).toBe('asdfasdf');
      expect(mockOnChange.mock.calls[0][1]).toBe(false);

      mockOnChange.mockReset();
      elem.setProps({isComplete: true});
      elem.find('input').prop('onChange')();
      expect(mockOnChange.mock.calls.length).toBe(1);
      expect(mockOnChange.mock.calls[0][0]).toBe('asdfasdf');
      expect(mockOnChange.mock.calls[0][1]).toBe(true);
    });
  });
});
