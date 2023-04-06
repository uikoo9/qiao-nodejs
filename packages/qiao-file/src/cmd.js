// fs
import { pathExists, copy, move, remove } from 'fs-extra';

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

/**
 * mv
 * @param {*} oldPath
 * @param {*} newPath
 */
export const mv = async (oldPath, newPath) => {
  try {
    const srcExists = await pathExists(oldPath);
    if (!srcExists) {
      debug('/ mv / src not exists');
      return;
    }

    await move(oldPath, newPath, { overwrite: true });
    debug('/ mv / success');

    return true;
  } catch (e) {
    debug('/ mv / fail');
    console.log(e);
  }
};

/**
 * rm
 * @param {*} fpath
 * @returns
 */
export const rm = async (fpath) => {
  try {
    await remove(fpath);
    return true;
  } catch (e) {
    console.log(e);
  }
};
