import uuidv1 from 'uuid/v1';
import uuid from './uuid';

jest.mock('uuid/v1', () => jest.fn());

it('uuid normalizes calls to the uuid/v1 repo', () => {
  uuid();
  expect(uuidv1.mock.calls.length).toBe(1);
});
