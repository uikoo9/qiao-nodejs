// fs
import { outputFile } from 'fs-extra';

// debug
import Debug from 'debug';
const debug = Debug('qiao-file');

/**
 * writeFile
 * @param {*} filePath
 * @param {*} fileData
 * @param {*} options https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#fswritefilesyncfile-data-options
 */
export const writeFile = async (filePath, fileData, options) => {
  // check
  debug('/ writeFile / filePath', filePath);
  if (!filePath) return;

  try {
    // vars
    fileData = fileData || '';
    options = options || {};
    debug('/ writeFile / options', options);

    await outputFile(filePath, fileData, options);
    return true;
  } catch (e) {
    debug('/ writeFile / fail');
    console.log(e);
  }
};
