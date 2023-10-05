// cos
import COS from 'cos-nodejs-sdk-v5';

// cdn
import { cdnSign } from './cdn-sign.js';

// bucket
import { listBuckets } from './bucket.js';

// upload
import { uploadFile } from './upload-file.js';
import { uploadFolder } from './upload-folder.js';

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

  // bucket
  app.listBuckets = async () => {
    return await listBuckets(app);
  };

  // upload
  app.uploadFile = async (dest, source) => {
    return await uploadFile(app, dest, source);
  };
  app.uploadFolder = async (destFolder, sourceFolder) => {
    return await uploadFolder(app, destFolder, sourceFolder);
  };

  // return
  return app;
};

export default init;
