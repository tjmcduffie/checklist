import React from 'react';
import {create} from 'react-test-renderer';
import Router from './Router';

describe('Router', () => {
  const noop = () => {};

  it('renders without crashing', () => {
    const elem = create(<Router />);
    elem.unmount();
  });

  it('renders predictably', () => {
    const elem = create(<Router />);
    expect(elem.toJSON()).toMatchSnapshot();
  });
});
