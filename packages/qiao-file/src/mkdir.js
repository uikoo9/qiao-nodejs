// fs
import { ensureDir } from 'fs-extra';

// debug
import Debug from 'debug';
const debug = Debug('qiao-file');

/**
 * mk dir
 * @param {*} dir
 * @returns
 */
export const mkdir = async (dir) => {
  try {
    await ensureDir(dir);
    debug('/ mkdir / success');

    return true;
  } catch (e) {
    debug('/ mkdir / fail');
    console.log(e);
  }
};
