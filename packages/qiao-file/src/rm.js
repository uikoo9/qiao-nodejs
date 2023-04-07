// fs
import { remove } from 'fs-extra';

// debug
import Debug from 'debug';
const debug = Debug('qiao-file');

/**
 * rm
 * @param {*} fpath
 * @returns
 */
export const rm = async (fpath) => {
  try {
    await remove(fpath);
    debug('/ rm / success');

    return true;
  } catch (e) {
    debug('/ rm / fail');
    console.log(e);
  }
};
