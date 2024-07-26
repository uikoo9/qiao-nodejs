// file
import { path } from 'qiao-file';

// debug
import Debug from 'debug';
const debug = Debug('qiao-cos');

/**
 * upload file
 * @param {*} app
 * @param {*} dest
 * @param {*} source
 * @returns
 */
export const uploadFile = (app, dest, source, options) => {
  // check
  if (!app || !app.client || !app.config) {
    return Promise.reject(new Error('need app, app.client, app.config'));
  }

  // upload
  return new Promise((resolve, reject) => {
    options = options || {};
    options.callback = (err, data) => {
      return err ? reject(err) : resolve(data);
    };

    uploadFileWithCallback(app, dest, source, options);
  });
};

/**
 * uploadFileWithCallback
 * @param {*} app
 * @param {*} dest
 * @param {*} source
 * @param {*} options
 * @returns
 */
export const uploadFileWithCallback = (app, dest, source, options) => {
  // check
  if (!app || !app.client || !app.config) {
    if (options.callback) options.callback(new Error('need app, app.client, app.config'));
    return;
  }

  // is absolute
  if (!path.isAbsolute(source)) {
    if (options.callback) options.callback(new Error('source file path must be absolute'));
    return;
  }

  // log
  debug(`from ${source} to ${dest}`);

  // options
  const finalOptions = {
    Bucket: app.config.Bucket,
    Region: app.config.Region,
    Key: dest,
    FilePath: source,
    SliceSize: options.sliceSize || 1024 * 1024 * 5,
  };
  if (options.onTaskReady) finalOptions.onTaskReady = options.onTaskReady;
  if (options.onProgress) finalOptions.onProgress = options.onProgress;
  if (options.onFileFinish) finalOptions.onFileFinish = options.onFileFinish;
  if (options.Headers) finalOptions.Headers = options.Headers;
  debug('finalOptions', finalOptions);

  // upload
  app.client.uploadFile(finalOptions, (err, data) => {
    if (options.callback) options.callback(err, data);
  });
};
