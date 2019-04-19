import uuidv4 from 'uuid/v4';

/**
 * Legacy uuid function
 * let counter = 0;
 * export default function uuid() {
 *   counter += 1;
 *   return uuid;
 * }
 */

// name param added to ease transition from 4 to v5
export default function uuid(name) {
  return uuidv4();
}
