import Nav from './Nav';
import React from 'react';
import {create} from 'react-test-renderer';

import {Link} from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  Link: 'Link'
}));

describe('Nav', () => {
  const noop = () => {};

  it('renders without crashing', () => {
    const elem = create(<Nav />);
    elem.unmount();
  });

  it('renders predictably', () => {
    const elem = create(<Nav />);
    expect(elem.toJSON()).toMatchSnapshot();
  });
});
