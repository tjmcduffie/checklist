import CreateItemFormUI from './CreateItemFormUI';
import React from 'react';
import {create} from 'react-test-renderer';

jest
  .mock('./CreateItemButtonUI', () => 'CreateItemButtonUI')
  .mock('./CreateItemInputUI', () => 'CreateItemInputUI');

describe('CreateItemFormUI', () => {
  const noop = () => {};

  it('renders without crashing', () => {
    const elem = create(
      <CreateItemFormUI onChange={noop} onSubmit={noop} value="" />
    );
    elem.unmount();
  });

  it('renders predictably', () => {
    const elem = create(<CreateItemFormUI onChange={noop} onSubmit={noop} value="" />);
    expect(elem.toJSON()).toMatchSnapshot();
  });
});
