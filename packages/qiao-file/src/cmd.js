// fs
import { pathExists, copy, move, remove } from 'fs-extra';

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
      console.log('qiao-file / cp / src not exists');
      return;
    }

    await copy(src, dest);
    console.log('qiao-file / cp / success');

    return true;
  } catch (e) {
    console.log('qiao-file / cp / fail');
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
    await move(oldPath, newPath);
    return true;
  } catch (e) {
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
