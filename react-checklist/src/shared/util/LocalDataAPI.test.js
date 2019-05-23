import Dexie from 'dexie';
import * as db from './LocalDataAPI';

jest
  .unmock('./LocalDataAPI')
  .mock('dexie', () => {
    function MockDexie() {
      return MockDexie.API;
    }
    MockDexie.API = {
      add: jest.fn().mockImplementation(() => MockDexie.API),
      update: jest.fn().mockImplementation(() => MockDexie.API),
      delete: jest.fn().mockImplementation(() => MockDexie.API),
      get: jest.fn().mockImplementation(() => MockDexie.API),
      put: jest.fn().mockImplementation(() => MockDexie.API),
      toArray: jest.fn().mockImplementation(() => MockDexie.API),
      where: jest.fn().mockImplementation(() => MockDexie.API),
      equals: jest.fn().mockImplementation(() => MockDexie.API),
      sortBy: jest.fn().mockImplementation(() => MockDexie.API),
      orderBy: jest.fn().mockImplementation(() => MockDexie.API),
      version: jest.fn().mockImplementation(() => MockDexie.API),
      stores: jest.fn().mockImplementation(() => MockDexie.API),
      table: jest.fn().mockImplementation(() => MockDexie.API),
    };
    return MockDexie;
  })
  .mock('./uuid', () => (() => 'asdfasdf'));

// this test lives outside because setup occurs when the file is imported
const dexie = new Dexie();
it('sets up or retrieves the local db', () => {
  expect(dexie.version.mock.calls[0][0]).toBe(1);
  expect(dexie.stores.mock.calls[0][0].items).toBeDefined();
  expect(dexie.stores.mock.calls[0][0].metadata).toBeDefined();
});

describe('LocalDataAPI normalizes interactions with IndexedDBs', () => {
  const ITEMS_TABLE = 'items';
  const META_TABLE = 'metadata';

  beforeEach(() => {
    Object.keys(dexie).forEach(prop => {
      if (dexie[prop] && dexie[prop].mock) {
        dexie[prop].mockClear();
      }
    });
  });

  describe('Items table', () => {
    it('creates new entries', () => {
      db.create({description: 'foo'});
      expect(dexie.table.mock.calls[0][0]).toEqual(ITEMS_TABLE);
      expect(dexie.add.mock.calls.length).toBe(1);
      expect(typeof dexie.add.mock.calls[0][0].createdTimestamp).toBe('number');
      expect(dexie.add.mock.calls[0][0].description).toEqual('foo');
      expect(typeof dexie.add.mock.calls[0][0].lastUpdateTimestamp).toBe('number');
      expect(dexie.add.mock.calls[0][0].uuid).toEqual('asdfasdf');
    });

    it('updates existing entries', () => {
      const now = Date.now();
      db.update('asdfasdf', {description: 'fooBar'});
      expect(dexie.table.mock.calls[0][0]).toEqual(ITEMS_TABLE);
      expect(dexie.update.mock.calls.length).toBe(1);
      expect(dexie.update.mock.calls[0][0]).toEqual('asdfasdf');
      expect(dexie.update.mock.calls[0][1].description).toEqual('fooBar');
      expect(dexie.update.mock.calls[0][1].lastUpdateTimestamp).toBeGreaterThanOrEqual(now);
    });

    it('removes an existing entry', () => {
      db.remove('asdfasdf');
      expect(dexie.table.mock.calls[0][0]).toEqual(ITEMS_TABLE);
      expect(dexie.delete.mock.calls.length).toBe(1);
      expect(dexie.delete.mock.calls[0][0]).toEqual('asdfasdf');
    });

    it('findAll retrieves all current entries', () => {
      db.findAll();
      expect(dexie.table.mock.calls[0][0]).toEqual(ITEMS_TABLE);
      expect(dexie.orderBy.mock.calls[0][0]).toBe('createdTimestamp');
      expect(dexie.toArray.mock.calls.length).toBe(1);
    });

    it('findIncomplete retrieves only incomplete entries', () => {
      db.findIncomplete();
      expect(dexie.table.mock.calls[0][0]).toEqual(ITEMS_TABLE);
      expect(dexie.where.mock.calls[0][0]).toBe('isComplete');
      expect(dexie.equals.mock.calls[0][0]).toBe(true);
      expect(dexie.sortBy.mock.calls[0][0]).toBe('createdTimestamp');
    });

    it('findByUuid retrieves a single item by UUID', () => {
      db.findByUuid('asdfasdf');
      expect(dexie.table.mock.calls[0][0]).toEqual(ITEMS_TABLE);
      expect(dexie.get.mock.calls[0][0]).toBe('asdfasdf');
    });
  });

  describe('Metadata table', () => {
    it('finds metadata by the supplied key', () => {
      db.findMetadata('asdfasdf');
      expect(dexie.table.mock.calls[0][0]).toEqual(META_TABLE);
      expect(dexie.get.mock.calls.length).toBe(1);
      expect(dexie.get.mock.calls[0][0]).toEqual('asdfasdf');
    });

    it('updates existing entries', () => {
      const now = Date.now();
      db.putMetadata('showCompleted', true);
      expect(dexie.table.mock.calls[0][0]).toEqual(META_TABLE);
      expect(dexie.put.mock.calls.length).toBe(1);
      expect(dexie.put.mock.calls[0][0]).toEqual({
        key: 'showCompleted',
        value: true,
      });
    });
  });
});
