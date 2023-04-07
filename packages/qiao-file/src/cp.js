// fs
import { pathExists, copy } from 'fs-extra';

// debug
import Debug from 'debug';
const debug = Debug('qiao-file');

/**
 * cp
 * @param {*} src file or folder src path
 * @param {*} dest file or folder dest path
 * @returns
 */
export const cp = async (src, dest) => {
  try {
    const srcExists = await pathExists(src);
    if (!srcExists) {
      debug('/ cp / src not exists');
      return;
    }

    await copy(src, dest);
    debug('/ cp / success');

    return true;
  } catch (e) {
    debug('/ cp / fail');
    console.log(e);
  }
};
