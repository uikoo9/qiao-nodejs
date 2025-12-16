// fs
import { fs } from 'qiao-file';

// check
import { checkSize } from './check-size.js';

// util
import { clearFile, clearTimeoutFn } from './util.js';

/**
 * downloadGo
 * @param {*} res
 * @param {*} dest
 * @param {*} timeout
 * @param {*} checkFileSize
 * @returns
 */
export const downloadGo = (res, dest, timeout, checkFileSize) => {
  // file
  return new Promise((resolve, reject) => {
    // timeout
    let timeoutId;
    if (timeout) {
      timeoutId = setTimeout(async () => {
        if (res) res.destroy();
        await clearFile(dest);
        reject(new Error('timeout'));
      }, timeout);
    }

    // file stream
    const file = fs.createWriteStream(dest);
    file.on('error', (err) => {
      // clear
      clearTimeoutFn(timeoutId, timeout);

      //
      reject(err);
    });
    file.on('finish', async () => {
      // clear
      clearTimeoutFn(timeoutId, timeout);

      // check file size
      if (checkFileSize) {
        const fileSizeRes = await checkSize(res, dest);
        if (fileSizeRes === false) {
          await clearFile(dest);
          return reject(new Error('check file size failed'));
        }
      }

      // r
      resolve(dest);
    });

    // pipe
    res.pipe(file);
  });
};
