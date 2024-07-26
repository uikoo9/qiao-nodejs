'use strict';

var COS = require('cos-nodejs-sdk-v5');
var STS = require('qcloud-cos-sts');
var qiao_log_js = require('qiao.log.js');
var qiaoFile = require('qiao-file');
var Debug = require('debug');
var progress = require('progress');

// md5
const { md5 } = require('qiao-encode');

/**
 * sign img
 * @param {*} key
 * @param {*} filepath
 * @param {*} timeout s
 * @returns
 */
const cdnSign = (key, filepath, timeout) => {
  // check
  if (!key) {
    console.log('qiao-cos / cdnSign / need config.key');
    return;
  }
  if (!filepath) {
    console.log('qiao-cos / cdnSign / need filepath');
    return;
  }

  // str
  const now = parseInt(Date.now() / 1000) + (timeout || 0);
  const str = key + filepath + now;

  // md5
  const md5Str = md5(str, 'hex');

  // url
  return `${filepath}?sign=${md5Str}&t=${now}`;
};

// sts
const logger = qiao_log_js.Logger('qiao-cos');

/**
 * getCredential
 * @param {*} durationSeconds
 * @param {*} allowPrefix
 * @param {*} config
 */
const getCredential = (durationSeconds, allowPrefix, config) => {
  const methodName = 'getCredential';
  logger.info(methodName, 'durationSeconds', durationSeconds);
  logger.info(methodName, 'allowPrefix', allowPrefix);
  logger.info(methodName, 'config', config);

  // options
  const options = {
    secretId: config.SecretId,
    secretKey: config.SecretKey,
    bucket: config.Bucket,
    region: config.Region,
    durationSeconds: durationSeconds || 1800,
    allowPrefix: allowPrefix || '',
  };
  const appId = options.bucket.substr(1 + options.bucket.lastIndexOf('-'));
  logger.info(methodName, 'options', options);
  logger.info(methodName, 'appId', appId);

  // policy
  const policy = {
    version: '2.0',
    statement: [
      {
        action: [
          // https://cloud.tencent.com/document/product/436/31923
          'name/cos:PutObject',
          'name/cos:PostObject',
          'name/cos:InitiateMultipartUpload',
          'name/cos:ListMultipartUploads',
          'name/cos:ListParts',
          'name/cos:UploadPart',
          'name/cos:CompleteMultipartUpload',
        ],
        effect: 'allow',
        principal: { qcs: ['*'] },
        resource: ['qcs::cos:' + options.region + ':uid/' + appId + ':' + options.bucket + '/' + options.allowPrefix],
      },
    ],
  };
  logger.info(methodName, 'policy', policy);

  // getCredential
  return new Promise((resolve, reject) => {
    STS.getCredential(
      {
        secretId: options.secretId,
        secretKey: options.secretKey,
        durationSeconds: options.durationSeconds,
        region: options.region,
        policy: policy,
      },
      function (err, credential) {
        return err ? reject(err) : resolve(credential);
      },
    );
  });
};

/**
 * listBuckets
 * @returns
 */
const listBuckets = (app) => {
  return new Promise((resolve, reject) => {
    // check
    if (!app || !app.client) return reject(new Error('need app, app.client'));

    // list bucket
    app.client.getService(function (err, data) {
      if (err) return reject(err);
      if (!data || data.statusCode !== 200) return reject(new Error('list buckets error'));

      resolve(data);
    });
  });
};

/**
 * listObjects
 * @param {*} app
 * @param {*} prefix
 * @param {*} max
 * @param {*} marker
 * @returns
 */
const listObjects = (app, prefix, max, marker) => {
  return new Promise((resolve, reject) => {
    // check
    if (!app || !app.client || !app.config) return reject(new Error('need app, app.client, app.config'));

    // options
    const options = {
      Bucket: app.config.Bucket,
      Region: app.config.Region,
    };
    if (prefix) options.Prefix = prefix;
    if (max) options.MaxKeys = max;
    if (marker) options.Marker = marker;

    // list object
    app.client.getBucket(options, (err, data) => {
      if (err) return reject(err);
      if (!data || data.statusCode !== 200) return reject(new Error('list buckets error'));

      resolve(data);
    });
  });
};

/**
 * listObjectsAll
 * @param {*} app
 * @param {*} prefix
 * @param {*} max
 * @param {*} marker
 * @returns
 */
const listObjectsAll = async (app, prefix, max) => {
  const list = [];

  await getObjects(list, app, prefix, max);
  return list;
};

// get objects
async function getObjects(list, app, prefix, max, marker) {
  try {
    // get
    const res = await listObjects(app, prefix, max, marker);
    console.log('qiao-cos / getObjects / IsTruncated', res.IsTruncated);
    console.log('qiao-cos / getObjects / NextMarker', res.NextMarker);
    console.log('qiao-cos / getObjects / Contents', res.Contents.length);
    list.push(...res.Contents);

    // go
    if (res.IsTruncated === 'true') await getObjects(list, app, prefix, max, res.NextMarker);
  } catch (error) {
    console.log(error);
  }
}

/**
 * delObject
 * @returns
 */
const delObject = (app, key) => {
  return new Promise((resolve, reject) => {
    // check
    if (!app || !app.client) return reject(new Error('need app, app.client'));

    // del object
    app.client.deleteObject(
      {
        Bucket: app.config.Bucket,
        Region: app.config.Region,
        Key: key,
      },
      function (err, data) {
        if (err) return reject(err);
        if (!data || data.statusCode !== 204) return reject(new Error('del object error'));

        resolve(data);
      },
    );
  });
};

// file
const debug = Debug('qiao-cos');

/**
 * uploadFile
 * @param {*} app
 * @param {*} dest
 * @param {*} source
 * @param {*} options
 * @returns
 */
const uploadFile = (app, dest, source, options) => {
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
const uploadFileWithCallback = (app, dest, source, options) => {
  // check
  if (!app || !app.client || !app.config) {
    if (options.callback) options.callback(new Error('need app, app.client, app.config'));
    return;
  }

  // is absolute
  if (!qiaoFile.path.isAbsolute(source)) {
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

// progress

/**
 * upload folder
 * @param {*} app
 * @param {*} destFolder
 * @param {*} sourceFolder
 * @returns
 */
const uploadFolder = async (app, destFolder, sourceFolder) => {
  // check
  if (!app || !app.client || !app.config) {
    return Promise.reject(new Error('need app, app.client, app.config'));
  }

  // is absolute
  if (!qiaoFile.path.isAbsolute(sourceFolder)) {
    return Promise.reject(new Error('source file path must be absolute'));
  }

  // time
  console.time('total use');

  // files
  const paths = await qiaoFile.lsdir(sourceFolder);
  const files = paths.files;
  const bar = new progress('uploading files... :current/:total', {
    total: files.length,
  });

  // vars
  const allFiles = [];
  const sucFiles = [];
  const failFiles = [];

  // upload
  return new Promise((resolve, reject) => {
    const options = {};
    options.callback = (err, data) => {
      allFiles.push(data);
      if (err || !data || data.statusCode != 200) {
        failFiles.push(err || data);
      } else {
        sucFiles.push(data);
      }

      bar.tick();

      if (bar.complete) {
        const obj = {};
        obj.paths = paths;
        obj.all = allFiles;
        obj.suc = sucFiles;
        obj.fail = failFiles;

        console.log();
        console.timeEnd('total use');
        console.log('all files:', allFiles.length);
        console.log('fail files:', failFiles.length);
        console.log('success files:', sucFiles.length);
        console.log();

        if (allFiles.length === sucFiles.length) {
          resolve(obj);
        } else {
          reject(new Error('some files upload failed'));
        }
      }
    };

    for (let i = 0; i < files.length; i++) {
      const file = files[i].path;
      const dest = destFolder + file.split(sourceFolder)[1];
      uploadFileWithCallback(app, dest, file, options);
    }
  });
};

// cos

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
  app.uploadFile = async (dest, source) => {
    return await uploadFile(app, dest, source);
  };
  app.uploadFolder = async (destFolder, sourceFolder) => {
    return await uploadFolder(app, destFolder, sourceFolder);
  };

  // return
  return app;
};

module.exports = init;
