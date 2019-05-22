import CreateItemFormClass from './CreateItemFormClass';
import {shallow} from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

it('CreateItemFormClass renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateItemFormClass onCreate={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('CreateItemFormClass maintains form state', () => {
  const mockOnCreate = jest.fn();

  afterEach(() => {
    mockOnCreate.mockReset();
  });

  it('responds to change events', () => {
    const data = {target: {value: 'test'}};
    const elem = shallow(<CreateItemFormClass onCreate={mockOnCreate} />);
    expect(elem.state('value')).toBe('');

    elem.find('CreateItemFormUI').prop('onChange')(data);
    expect(elem.state('value')).toBe('test');
  });

  it('submits data to the correct prop', () => {
    const data = {preventDefault: jest.fn()};
    const elem = shallow(<CreateItemFormClass onCreate={mockOnCreate} />);

    // form is in its default state so it won't call the onCreate prop
    elem.find('CreateItemFormUI').prop('onSubmit')(data);
    expect(data.preventDefault.mock.calls.length).toBe(1);
    expect(mockOnCreate.mock.calls.length).toBe(0);

    // form has data and will submit
    mockOnCreate.mockReset();
    data.preventDefault.mockReset();
    elem.setState({'value': 'test'});
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
    const elem = shallow(<CreateItemFormClass onCreate={mockOnCreate} />);
    elem.setState({'value': '   test   '});
    elem.find('CreateItemFormUI').prop('onSubmit')(data);
    expect(mockOnCreate.mock.calls[0][0].description).toBe('test');
  });

  it('resets the form state after submission', () => {
    const data = {preventDefault: jest.fn()};
    const elem = shallow(<CreateItemFormClass onCreate={mockOnCreate} />);
    elem.setState({'value': 'test'});
    elem.find('CreateItemFormUI').prop('onSubmit')(data);
    expect(elem.state('value')).toBe('');
  });
});
