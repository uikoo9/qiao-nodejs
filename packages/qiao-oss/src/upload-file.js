// file
import { path } from 'qiao-file';

// debug
import Debug from 'debug';
const debug = Debug('qiao-oss');

/**
 * upload file
 * @param {*} app
 * @param {*} dest
 * @param {*} source
 * @returns
 */
export const uploadFile = (app, dest, source) => {
  // check
  if (!app || !app.client || !app.config) {
    return Promise.reject(new Error('need app, app.client, app.config'));
  }

  // upload
  return new Promise((resolve, reject) => {
    uploadFileWithCallback(app, dest, source, (err, data) => {
      return err ? reject(err) : resolve(data);
    });
  });
};

/**
 * upload file with callback
 * @param {*} app
 * @param {*} dest
 * @param {*} source
 * @param {*} cb
 * @returns
 */
export const uploadFileWithCallback = (app, dest, source, cb) => {
  // check
  if (!app || !app.client || !app.config) {
    if (cb) cb(new Error('need app, app.client, app.config'));
    return;
  }

  // is absolute
  if (!path.isAbsolute(source)) {
    if (cb) cb(new Error('source file path must be absolute'));
    return;
  }

  // log
  debug(`from ${source} to ${dest}`);

  // upload
  app.client
    .put(dest, source)
    .then((result) => {
      if (cb) cb(null, result);
    })
    .catch((e) => {
      if (cb) cb(e);
    });
};
