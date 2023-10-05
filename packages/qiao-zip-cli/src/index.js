// qiao-zip
import { zip, unzip } from 'qiao-zip';

/**
 * zipIt
 * @param {*} src
 * @param {*} dest
 * @param {*} subdir
 * @returns
 */
export const zipIt = async (src, dest, subdir) => {
  return await zip(src, dest, subdir);
};

/**
 * unzipIt
 * @param {*} zipFile
 * @param {*} destFolder
 * @returns
 */
export const unzipIt = async (zipFile, destFolder) => {
  return await unzip(zipFile, destFolder);
};
