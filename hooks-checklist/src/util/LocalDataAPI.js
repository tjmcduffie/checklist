import Dexie from 'dexie';
import uuid from './uuid';

const db = new Dexie('react-checklist');
db.version(1).stores({
  items: "uuid, createdTimestamp, description, isComplete, lastUpdateTimestamp",
  metadata: "key, value",
});

export default db;

// ITEMS
/**
 * data: Item object
 * returns [Promise/A+](https://dexie.org/docs/Promise/Promise)
 */
export function create(baseData) {
  const now = Date.now();
  const data = Object.assign(baseData, {
    createdTimestamp: now,
    lastUpdateTimestamp: now,
    uuid: uuid(),
  });
  return db.table('items').add(data);
}

/**
 * key: Item uuid
 * data: changes to Item object
 * returns [Promise/A+](https://dexie.org/docs/Promise/Promise)
 */
export function update(key, baseData) {
  const data = Object.assign(baseData, {
    lastUpdateTimestamp: Date.now()
  });
  return db.table('items').update(key, data);
}

/**
 * key: Item uuid
 * data: changes to Item object
 * returns [Promise/A+](https://dexie.org/docs/Promise/Promise)
 */
export function remove(key) {
  return db.table('items').delete(key);
}

/**
 * Find all entries in the db sorted by creation timestamp
 * returns [Promise/A+](https://dexie.org/docs/Promise/Promise). Success receives
 *   and Array of Items in the db.
 */
export function findAll() {
  return db.table('items').orderBy('createdTimestamp').toArray();
}

/**
 * Find all incomplete entries in the db sorted by creation timestamp
 * returns [Promise/A+](https://dexie.org/docs/Promise/Promise). Success receives
 *   and Array of Items in the db.
 */
export function findIncomplete() {
  return db.table('items')
    .where('isComplete')
    .equals(true)
    .sortBy('createdTimestamp');
}

/**
 * Find a specific item in the db by uuid
 * returns [Promise/A+](https://dexie.org/docs/Promise/Promise). Success receives
 *   an Item object.
 */
export function findByUuid(uuid) {
  return db.table('items').get(uuid);
}

// METADATA
/**
 * Find a specific piece of metadata
 * returns [Promise/A+](https://dexie.org/docs/Promise/Promise). Success receives
 *   the metadata object.
 */
export function findMetadata(key) {
  return db.table('metadata').get(key);
}


/**
 * Find a specific piece of metadata
 * returns [Promise/A+](https://dexie.org/docs/Promise/Promise). Success receives
 *   the metadata object.
 */
export function putMetadata(key, data) {
  return db.table('metadata').put({key, value: data});
}