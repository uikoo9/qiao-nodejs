// fs
import { fs } from 'qiao-file';

// check
import { checkSize } from './check-size.js';

// util
import { clearFile, clearTimeoutFn } from './util.js';

/**
 * download go
 * @param {*} res
 * @param {*} dest
 * @param {*} timeout
 * @returns
 */
export const downloadGo = (res, dest, timeout) => {
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

      //
      const fileSizeRes = await checkSize(res, dest);
      if (!fileSizeRes) {
        await clearFile(dest);
        reject(new Error('check file size failed'));
      } else {
        resolve(dest);
      }
    });

    // pipe
    res.pipe(file);
  });
};
