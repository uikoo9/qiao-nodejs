// fs
import { isExists, rm } from 'qiao-file';

// debug
import Debug from 'debug';
const debug = Debug('qiao-downloader');

/**
 * reject error
 * @param {*} e
 * @returns
 */
export const rejectError = (e) => {
  return Promise.reject(typeof e === 'string' ? new Error(e) : e);
};

/**
 * clear timeout
 * @param {*} timeoutId
 * @param {*} timeout
 * @returns
 */
export const clearTimeoutFn = (timeoutId, timeout) => {
  if (!timeoutId || !timeout) return;

  clearTimeout(timeoutId);
};

/**
 * clear file
 * @param {*} dest
 * @returns
 */
export const clearFile = async (dest) => {
  // check
  const isExistsRes = await isExists(dest);
  debug('clear / is exists', isExistsRes);
  if (!isExistsRes) return;

  // rm
  const rmRes = await rm(dest);
  debug('clear / rm', rmRes);
  if (!rmRes) return;

  // suc
  debug('clear / success');
};
