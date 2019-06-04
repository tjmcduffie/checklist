import CreateItemFormHooks from './CreateItemFormHooks';
import {shallow} from 'enzyme';
import React from 'react';
import {create} from 'react-test-renderer';

jest.mock('../shared/create-item-form/CreateItemFormUI', () => 'CreateItemFormUI');

describe('CreateItemFormHooks', () => {
  it('renders without crashing', () => {
    const elem = create(
      <CreateItemFormHooks onCreate={() => {}} />
    );
    elem.unmount();
  });

  describe('maintains form state', () => {
    const mockOnCreate = jest.fn();

    afterEach(() => {
      mockOnCreate.mockReset();
    });

    it('responds to change events', () => {
      const data = {target: {value: 'test'}};
      const elem = shallow(<CreateItemFormHooks onCreate={mockOnCreate} />);
      // cannot check state value in shallow render due to a react bug
      // expect(elem.state('value')).toBe('');
      expect(elem.find('CreateItemFormUI').prop('value')).toBe('');

      elem.find('CreateItemFormUI').prop('onChange')(data);
      // cannot check state value in shallow render due to a react bug
      // expect(elem.state('value')).toBe('test');
      expect(elem.find('CreateItemFormUI').prop('value')).toBe('test');
    });

    it('submits data to the correct prop', () => {
      const data = {preventDefault: jest.fn()};
      const elem = shallow(<CreateItemFormHooks onCreate={mockOnCreate} />);

      // form is in its default state so it won't call the onCreate prop
      elem.find('CreateItemFormUI').prop('onSubmit')(data);
      expect(data.preventDefault.mock.calls.length).toBe(1);
      expect(mockOnCreate.mock.calls.length).toBe(0);

      // form has data and will submit
      mockOnCreate.mockReset();
      data.preventDefault.mockReset();
      elem.find('CreateItemFormUI').prop('onChange')({target: {value: 'test'}});
      elem.find('CreateItemFormUI').prop('onSubmit')(data);
      expect(data.preventDefault.mock.calls.length).toBe(1);
      expect(mockOnCreate.mock.calls.length).toBe(1);
      expect(mockOnCreate.mock.calls[0][0]).toEqual({
        description: 'test',
        isComplete: false,
      });
    });

    it('trims leading/trailing whitespace from the value before submission', () => {
      const data = {preventDefault: jest.fn()};
      const elem = shallow(<CreateItemFormHooks onCreate={mockOnCreate} />);
      elem.find('CreateItemFormUI').prop('onChange')({target: {value: '   test   '}})
      elem.find('CreateItemFormUI').prop('onSubmit')(data);
      expect(mockOnCreate.mock.calls[0][0].description).toBe('test');
    });

    it('resets the form state after submission', () => {
      const data = {preventDefault: jest.fn()};
      const elem = shallow(<CreateItemFormHooks onCreate={mockOnCreate} />);
      elem.find('CreateItemFormUI').prop('onChange')({target: {value: 'test'}});
      elem.find('CreateItemFormUI').prop('onSubmit')(data);
      // cannot check state value in shallow render due to a react bug
      // expect(elem.state('value')).toBe('');
      expect(elem.find('CreateItemFormUI').prop('value')).toBe('');
    });
  });
});
