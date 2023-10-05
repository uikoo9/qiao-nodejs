'use strict';

var COS = require('cos-nodejs-sdk-v5');
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
 * @returns
 */
const listObjects = (app, prefix, max) => {
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

    // list object
    app.client.getBucket(options, (err, data) => {
      if (err) return reject(err);
      if (!data || data.statusCode !== 200) return reject(new Error('list buckets error'));

      resolve(data);
    });
  });
};

// file
const debug = Debug('qiao-cos');

/**
 * upload file
 * @param {*} app
 * @param {*} dest
 * @param {*} source
 * @returns
 */
const uploadFile = (app, dest, source) => {
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
const uploadFileWithCallback = (app, dest, source, cb) => {
  // check
  if (!app || !app.client || !app.config) {
    if (cb) cb(new Error('need app, app.client, app.config'));
    return;
  }

  // is absolute
  if (!qiaoFile.path.isAbsolute(source)) {
    if (cb) cb(new Error('source file path must be absolute'));
    return;
  }

  // log
  debug(`from ${source} to ${dest}`);

  // upload
  app.client.sliceUploadFile(
    {
      Region: app.config.Region,
      Bucket: app.config.Bucket,
      Key: dest,
      FilePath: source,
    },
    (err, data) => {
      if (cb) cb(err, data);
    },
  );
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
    for (let i = 0; i < files.length; i++) {
      const file = files[i].path;
      const dest = destFolder + file.split(sourceFolder)[1];
      uploadFileWithCallback(app, dest, file, (err, data) => {
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
      });
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

  // bucket
  app.listBuckets = async () => {
    return await listBuckets(app);
  };
  app.listObjects = async (prefix, max) => {
    return await listObjects(app, prefix, max);
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
