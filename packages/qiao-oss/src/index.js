// os
import OSS from 'ali-oss';

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
  if (!config.accessKeyId) throw new Error('need config.accessKeyId params');
  if (!config.accessKeySecret) throw new Error('need config.accessKeySecret params');
  if (!config.region) throw new Error('need config.region params');
  if (!config.bucket) throw new Error('need config.bucket params');

  // app
  const app = {};
  app.config = config;
  app.client = new OSS({
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    region: config.region,
    bucket: config.bucket,
  });

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
