// fs
import { pathExists, move } from 'fs-extra';

// debug
import Debug from 'debug';
const debug = Debug('qiao-file');

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
