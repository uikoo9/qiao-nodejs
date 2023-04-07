// fs
import { readFile as readFileByFse } from 'fs-extra';

// debug
import Debug from 'debug';
const debug = Debug('qiao-file');

/**
 * readFile
 * @param {*} filePath
 * @param {*} options https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#fsreadfilesyncpath-options
 * @returns
 */
export const readFile = async (filePath, options) => {
  // check
  debug('/ readFile / filePath', filePath);
  if (!filePath) return;

  try {
    // opt
    const opt = { encoding: 'utf8' };
    options = options || opt;
    debug('/ readFile / options', options);

    return await readFileByFse(filePath, options);
  } catch (e) {
    debug('/ readFile / fail');
    console.log(e);
  }
};
