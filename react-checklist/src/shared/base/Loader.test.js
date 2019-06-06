import Loader from './Loader';
import React from 'react';
import {create} from 'react-test-renderer';

describe('Loader', () => {
  const noop = () => {};

  it('renders without crashing', () => {
    const elem = create(<Loader />);
    elem.unmount();
  });

  it('renders predictably', () => {
    const elem = create(<Loader />);
    expect(elem.toJSON()).toMatchSnapshot();
  });
});
