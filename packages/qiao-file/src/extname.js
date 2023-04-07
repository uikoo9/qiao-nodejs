// path
import path from 'path';

/**
 * extname
 * @param {*} filePath
 * @returns
 */
export const extname = (filePath) => {
  if (!filePath) return;

  return path.extname(filePath.toLowerCase());
};
