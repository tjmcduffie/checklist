import App from './App';
import {shallow} from 'enzyme';
import * as db from '../shared/util/LocalDataAPI';
import React from 'react';
import {create} from 'react-test-renderer';

jest
  .mock('../shared/util/LocalDataAPI')
  .mock('./CreateItemFormClass', () => 'CreateItemFormClass')
  .mock('../shared/checklist/ItemsUI', () => 'ItemsUI');

beforeEach(() => {
  db.findAll.mockResolvedValue([]);
  db.findMetadata.mockResolvedValue(true);
  db.putMetadata.mockResolvedValue(true);
});

afterEach(() => {
  db.findAll.mockReset();
  db.findMetadata.mockReset();
  db.putMetadata.mockReset();
});

it('App renders without crashing', () => {
  db.findAll.mockResolvedValue([]);
  db.findMetadata.mockResolvedValue(true);
  const elem = create(<App />);
  elem.unmount();
});

describe('App renders child components', () => {
  it('renders the checklist', () => {
    const elem = shallow(<App />);
    expect(elem.find('ItemsUI').length).toBe(1);
  });

  it('renders the create form', () => {
    const elem = shallow(<App />);
    expect(elem.find('CreateItemFormClass').length).toBe(1);
  });
});

describe('App mutates and stores data & metadata', () => {
  it('fetches initial items on mount', async () => {
    const items = [1,2,3,4,5].map(seed => ({
      uuid: seed,
      createdTimestamp: Date.now(),
      description: 'test',
      order: seed,
      isComplete: false,
      lastUpdateTimestamp: Date.now(),
    }))
    db.findAll.mockResolvedValue(items);
    const elem = shallow(<App />);

    expect(db.findAll.mock.calls.length).toBe(1);
    expect(elem.state('items')).toEqual([]);

    // adding an awaited promise here allows us to confidently check post
    // resolution/rejection logic contained within lifecycle methods
    await Promise.resolve();
    expect(elem.state('items')).toBe(items);
  });

  it('fetches metadata for showing complete items on mount', async () => {
    const showCompleted = false;
    db.findMetadata.mockResolvedValue(showCompleted);
    const elem = shallow(<App />);

    expect(db.findMetadata.mock.calls.length).toBe(1);
    expect(elem.state('shouldShowCompleted')).toBe(true);

    // adding an awaited promise here allows us to confidently check post
    // resolution/rejection logic contained within lifecycle methods
    await Promise.resolve();
    expect(elem.state('shouldShowCompleted')).toBe(showCompleted);
  });

  it('handles errors on mount', async () => {
    db.findAll.mockRejectedValue(new Error('findAll Error'));
    db.findMetadata.mockRejectedValue(new Error('findMetadata Error'));
    const elem = shallow(<App />);

    expect(elem.state('errors')).toEqual([]);

    // adding an awaited promise here allows us to confidently check post
    // resolution/rejection logic contained within lifecycle methods
    try { await Promise.reject(new Error('fail')); } catch(e) {}
    expect(elem.state('errors')).toEqual(['findAll Error', 'findMetadata Error']);
  });

  it('creates items', async () => {
    const item = {
      description: 'test',
      isComplete: false,
    };
    const dbItem = Object.assign({}, item, {
      createdTimestamp: Date.now(),
      lastUpdateTimestamp: Date.now(),
      order: 0,
      uuid: 'abcdefg',
    });
    db.findAll.mockResolvedValueOnce([]);
    db.create.mockResolvedValueOnce(dbItem.uuid);
    db.findByUuid.mockResolvedValueOnce(dbItem);
    const elem = shallow(<App />);
    elem.find('CreateItemFormClass').prop('onCreate')(item);

    await Promise.resolve();
    await Promise.resolve();
    expect(db.create.mock.calls[0][0]).toEqual(item);
    expect(db.findByUuid.mock.calls[0][0]).toEqual(dbItem.uuid);
    expect(elem.state('items')).toEqual([dbItem]);

    db.create.mockRejectedValueOnce(new Error('create error'));
    elem.find('CreateItemFormClass').prop('onCreate')(item);

    try { await Promise.reject(new Error('fail')); } catch(e) {}
    expect(elem.state('errors')).toEqual(['create error']);

    elem.setState({'errors': []});
    db.create.mockResolvedValueOnce(dbItem.uuid);
    db.findByUuid.mockRejectedValueOnce(new Error('findByUuid error'));
    elem.find('CreateItemFormClass').prop('onCreate')(item);

    try { await Promise.reject(new Error('fail')); } catch(e) {}
    try { await Promise.reject(new Error('fail')); } catch(e) {}
    expect(elem.state('errors')).toEqual(['findByUuid error']);
  });

  it('removes items', async () => {
    const item = {uuid: 'abcdefg'};
    db.remove.mockResolvedValueOnce();
    const elem = shallow(<App />);
    elem.setState({items: [item]});
    expect(elem.state('items')).toEqual([item]);
    elem.find('ItemsUI').prop('onRemoveItem')(item.uuid);

    await Promise.resolve();
    expect(db.remove.mock.calls[0][0]).toEqual(item.uuid);
    expect(elem.state('items')).toEqual([]);
  });

  it('toggles item completion state', async () => {
    const item = {uuid: 'abcdefg', isComplete: false};
    const completedItem = Object.assign({}, item, {isComplete: !item.isComplete})
    db.findAll.mockResolvedValue([item]);
    db.findByUuid.mockResolvedValueOnce(completedItem);
    db.update.mockResolvedValueOnce(1); // 1 indicates the update succeeded
    const elem = shallow(<App />);
    elem.find('ItemsUI').prop('onToggleIsComplete')(item.uuid, item.isComplete);

    await Promise.resolve();
    expect(db.update.mock.calls[0][0]).toEqual(item.uuid);
    expect(db.update.mock.calls[0][1]).toEqual({isComplete: !item.isComplete});
    expect(db.findByUuid.mock.calls[0][0]).toEqual(item.uuid);
    expect(elem.state('items')).toEqual([item]);

    await Promise.resolve();
    expect(elem.state('items')).toEqual([completedItem]);

    db.update.mockResolvedValueOnce(0); // 1 indicates the update failed
    elem.find('ItemsUI').prop('onToggleIsComplete')(item.uuid, item.isComplete);

    try { await Promise.reject(new Error('fail')); } catch(e) {}
    expect(elem.state('errors')).toEqual([`${item.uuid} could not be updated as it could not be found`]);
  });

  it('toggles showing/hiding completed items', async () => {
    db.findMetadata.mockResolvedValue(true);
    db.putMetadata.mockResolvedValue();
    const elem = shallow(<App />);
    expect(elem.state('shouldShowCompleted')).toEqual(true);
    elem.find('button').prop('onClick')();

    await Promise.resolve();
    expect(db.putMetadata.mock.calls[0][1]).toEqual(false);
    expect(elem.state('shouldShowCompleted')).toEqual(false);
  });
});
