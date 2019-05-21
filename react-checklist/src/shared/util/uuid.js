import uuidv1 from 'uuid/v1';

/**
 * Legacy uuid function
 * let counter = 0;
 * export default function uuid() {
 *   counter += 1;
 *   return uuid;
 * }
 */

// use a generic wrapper to make version switching less painful
export default function uuid() {
  return uuidv1();
}
