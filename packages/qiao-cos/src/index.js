// cos
import COS from 'cos-nodejs-sdk-v5';

// cdn
import { cdnSign } from './cdn-sign.js';

// sts
import { getCredential } from './sts.js';

// bucket
import { listBuckets, listObjects, listObjectsAll } from './bucket.js';

// object
import { delObject } from './object.js';

// upload
import { uploadFile } from './upload-file.js';
import { uploadFolder } from './upload-folder.js';

// review
import { reviewTxt } from './review.js';

/**
 * init app
 * @param {*} config
 * @returns
 */
const init = (config) => {
  // check
  if (!config) throw new Error('need config params');
  if (!config.SecretId) throw new Error('need config.SecretId params');
  if (!config.SecretKey) throw new Error('need config.SecretKey params');
  if (!config.Region) throw new Error('need config.Region params');
  if (!config.Bucket) throw new Error('need config.Bucket params');

  // app
  const app = {};
  app.config = config;
  app.client = new COS({
    SecretId: config.SecretId,
    SecretKey: config.SecretKey,
  });

  // cdn
  app.cdnSign = (filepath, timeout) => {
    return cdnSign(config.signKey, filepath, timeout);
  };

  // sts
  app.getCredential = async (durationSeconds, allowPrefix) => {
    return await getCredential(durationSeconds, allowPrefix, config);
  };

  // bucket
  app.listBuckets = async () => {
    return await listBuckets(app);
  };
  app.listObjects = async (prefix, max, marker) => {
    return await listObjects(app, prefix, max, marker);
  };
  app.listObjectsAll = async (prefix, max) => {
    return await listObjectsAll(app, prefix, max);
  };

  // object
  app.delObject = async (key) => {
    return await delObject(app, key);
  };

  // upload
  app.uploadFile = async (dest, source, options) => {
    return await uploadFile(app, dest, source, options);
  };
  app.uploadFolder = async (destFolder, sourceFolder) => {
    return await uploadFolder(app, destFolder, sourceFolder);
  };

  // review
  app.reviewTxt = async (txt) => {
    return await reviewTxt(app, txt);
  };

  // return
  return app;
};

export default init;
