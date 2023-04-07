// fs
import { pathExists, stat } from 'fs-extra';

/**
 * is dir
 * @param {*} dir
 * @returns
 */
export const isDir = async (dir) => {
  // check
  const dirExists = await pathExists(dir);
  if (!dirExists) return;

  // stat
  const statRes = await stat(dir);
  return statRes.isDirectory();
};
