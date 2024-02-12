// get ip race
import { getIPRace } from './get-ip-race.js';

/**
 * get ip
 * @param {*} timeout
 * @param {*} debug
 * @returns
 */
export const getIP = (timeout, debug) => {
  return getIPRace(timeout, debug);
};
