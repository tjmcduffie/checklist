import App from './App';
import {mount} from 'enzyme';
import * as db from '../shared/util/LocalDataAPI';
import React from 'react';
import {act} from 'react-dom/test-utils';
import {create} from 'react-test-renderer';

jest
  .mock('../shared/util/LocalDataAPI')
  .mock('./CreateItemFormHooks', () => 'mock-form-component')
  .mock('../shared/checklist/ItemsUI', () => ({
    SortableItems: () => 'SortableItems',
  }));

const waitForPromisesResolution = async (elem) => {
  await Promise.resolve();
  elem.update();
}

const waitForPromiseRejection = async (message = 'fail') => {
  try { await Promise.reject(new Error(message)); } catch(e) {}
}

describe('ReactHooks App', () => {
  let elem;
  beforeEach(() => {
    db.findAll.mockResolvedValue([]);
    db.findMetadata.mockResolvedValue(true);
    db.putMetadata.mockResolvedValue(true);
  });

  afterEach(() => {
    db.findAll.mockReset();
    db.findByUuid.mockReset();
    db.findMetadata.mockReset();
    db.putMetadata.mockReset();
    elem = undefined;
  });

  it('renders without crashing', async () => {
    await act(async () => (elem = mount(<App />)));
    elem.unmount();
  });

  describe('renders child components', () => {
    it('renders the checklist', async () => {
      await act(async () => (elem = mount(<App />)));
      expect(elem.find('SortableItems').length).toBe(1);
    });

    it('renders the create form', async () => {
      await act(async () => (elem = mount(<App />)));
      expect(elem.find('mock-form-component').length).toBe(1);
    });
  });

  describe('mutates and stores data & metadata', () => {
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

      await act(async () => (elem = mount(<App />)));
      await waitForPromisesResolution(elem);
      expect(db.findAll.mock.calls.length).toBe(1);
      expect(elem.find('SortableItems').prop('items')).toEqual(items);
    });

    it('fetches metadata for showing complete items on mount', async () => {
      const showCompleted = false;
      db.findMetadata.mockResolvedValue(showCompleted);

      await act(async () => (elem = mount(<App />)));
      await waitForPromisesResolution(elem);
      expect(db.findMetadata.mock.calls.length).toBe(1);
      expect(elem.find('SortableItems').prop('shouldShowCompleted')).toEqual(showCompleted);
    });

    it.skip('handles errors on mount', async () => {
      db.findAll.mockRejectedValue(new Error('findAll Error'));
      db.findMetadata.mockRejectedValue(new Error('findMetadata Error'));

      await act(async () => (elem = mount(<App />)));
      await waitForPromiseRejection('fail');
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

      await act(async () => (elem = mount(<App />)));
      await waitForPromisesResolution(elem);

      await act(async() => elem.find('mock-form-component').prop('onCreate')(item));
      await waitForPromisesResolution(elem);
      expect(db.create.mock.calls[0][0]).toEqual(item);
      expect(db.findByUuid.mock.calls[0][0]).toEqual(dbItem.uuid);
      expect(elem.find('SortableItems').prop('items')).toEqual([dbItem]);

      db.create.mockRejectedValueOnce(new Error('create error'));
      await act(async() => elem.find('mock-form-component').prop('onCreate')(item));

      console.log('ERROR CHECKING DISABLED UNTIL HOOKS ARE FULLY SUPPORTED OR ERROR UI IS CREATED')
      // try { await Promise.reject(new Error('fail')); } catch(e) {}
      // expect(elem.state('errors')).toEqual(['create error']);
      //
      // elem.setState({'errors': []});
      // db.create.mockResolvedValueOnce(dbItem.uuid);
      // db.findByUuid.mockRejectedValueOnce(new Error('findByUuid error'));
      // elem.find('mock-form-component').prop('onCreate')(item);
      //
      // try { await Promise.reject(new Error('fail')); } catch(e) {}
      // try { await Promise.reject(new Error('fail')); } catch(e) {}
      // expect(elem.state('errors')).toEqual(['findByUuid error']);
    });

    it('removes items', async () => {
      const item = {uuid: 'abcdefg'};
      db.remove.mockResolvedValue();
      db.findAll.mockResolvedValue([item]);

      await act(async () => (elem = mount(<App />)));
      await waitForPromisesResolution(elem)
      expect(elem.find('SortableItems').prop('items')).toEqual([item]);

      await act(async () => elem.find('SortableItems').prop('onRemoveItem')(item.uuid));
      await waitForPromisesResolution(elem)
      expect(db.remove.mock.calls[0][0]).toEqual(item.uuid);
      expect(elem.find('SortableItems').prop('items')).toEqual([]);
    });

    it('toggles item completion state', async () => {
      const item = {uuid: 'abcdefg', isComplete: false};
      const completedItem = Object.assign({}, item, {isComplete: !item.isComplete})
      db.findAll.mockResolvedValue([item]);
      db.findByUuid.mockResolvedValueOnce(completedItem);
      db.update.mockResolvedValueOnce(1); // 1 indicates the update succeeded

      await act(async () => (elem = mount(<App />)));
      await waitForPromisesResolution(elem);

      await act(async () => elem.find('SortableItems').prop('onToggleIsComplete')(item.uuid, item.isComplete));
      await waitForPromisesResolution(elem);
      expect(db.update.mock.calls[0][0]).toEqual(item.uuid);
      expect(db.update.mock.calls[0][1]).toEqual({isComplete: !item.isComplete});
      expect(db.findByUuid.mock.calls[0][0]).toEqual(item.uuid);
      expect(elem.find('SortableItems').prop('items')).toEqual([completedItem]);

      // db.update.mockResolvedValueOnce(0); // 1 indicates the update failed
      // await act(async () => elem.find('SortableItems').prop('onToggleIsComplete')(item.uuid, item.isComplete));
      //
      // await waitForPromiseRejection('fail');
      // expect(elem.state('errors')).toEqual([`${item.uuid} could not be updated as it could not be found`]);
    });

    it('toggles showing/hiding completed items', async () => {
      db.findMetadata.mockResolvedValue(true);
      db.putMetadata.mockResolvedValue();

      await act(async () => (elem = mount(<App />)));
      await waitForPromisesResolution(elem);
      expect(elem.find('SortableItems').prop('shouldShowCompleted')).toEqual(true);

      await act(async () => elem.find('button').prop('onClick')());
      await waitForPromisesResolution(elem);
      expect(db.putMetadata.mock.calls[0][1]).toEqual(false);
      expect(elem.find('SortableItems').prop('shouldShowCompleted')).toEqual(false);
    });
  });
});
