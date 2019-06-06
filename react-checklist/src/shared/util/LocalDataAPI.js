import Dexie from 'dexie';
import uuid from './uuid';

const db = new Dexie('react-checklist');
db.version(1).stores({
  items: "uuid, createdTimestamp, description, order, isComplete, lastUpdateTimestamp",
  metadata: "key, value",
});

export default db;

// ITEMS
/**
 * data: Item object
 * returns [Promise/A+](https://dexie.org/docs/Promise/Promise)
 */
 export function create(baseData) {
   return db.table('items')
     .count()
     .then(count => {
       const now = Date.now();
       const data = Object.assign(baseData, {
         createdTimestamp: now,
         lastUpdateTimestamp: now,
         order: count,
         uuid: uuid(),
       });
       return db.table('items').add(data);
     });
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
 * update multiple Items
 * data: Array of tuples containing a uuid and updates to apply
 * returns [Promise/A+](https://dexie.org/docs/Promise/Promise)
 */
export function bulkUpdate(data) {
  return new Promise((resolve, reject) => {
    Promise.all(
      data.map(([uuid, dataToUpdate]) => update(uuid, dataToUpdate)
    )).then(values => {
      values.forEach(value => {
        if (value === 0) {
          reject(new Error(`${uuid} could not be updated as it could not be found`));
        }
      });
      return Promise.all(data.map(([uuid]) => findByUuid(uuid)))
        .then(values => resolve(values));
    });
  });
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
