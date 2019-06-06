import {shallow} from 'enzyme';
import Header from './Header';
import React from 'react';
import {create} from 'react-test-renderer';


import {Link} from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  Link: 'Link'
}));

describe('Header', () => {
  const noop = () => {};

  it('renders without crashing', () => {
    const elem = create(<Header />);
    elem.unmount();
  });

  describe('renders predictably', () => {
    it('when showing completed items', () => {
      const elem = create(<Header />);
      expect(elem.toJSON()).toMatchSnapshot();
    });
    it('when hiding completed items', () => {
      const elem = create(<Header shouldShowCompleted={false} />);
      expect(elem.toJSON()).toMatchSnapshot();
    });
  });

  describe('renders predictably', () => {
    it('triggers the toggle show completed callback', () => {
      const mockOnToggle = jest.fn();
      const elem = shallow(<Header onToggleShowCompleted={mockOnToggle} />);
      const button = elem.find('button');

      button.simulate('click');
      expect(mockOnToggle.mock.calls.length).toBe(1);

      button.simulate('keypress', {key: ' '});
      expect(mockOnToggle.mock.calls.length).toBe(2);

      button.simulate('keypress', {key: 'Enter'});
      expect(mockOnToggle.mock.calls.length).toBe(3);

      button.simulate('keypress', {key: 'TAB'});
      expect(mockOnToggle.mock.calls.length).toBe(3);
    });
  });
});
