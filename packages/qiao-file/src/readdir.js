// fs
import { readdir as fsReadDir } from 'fs-extra';

/**
 * read dir
 * @param {*} dirPath
 * @returns
 */
export const readdir = (dirPath) => {
  return new Promise((resolve) => {
    fsReadDir(dirPath, (err, files) => {
      resolve(err ? false : files);
    });
  });
};
