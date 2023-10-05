'use strict';

var OSS = require('ali-oss');
var qiaoFile = require('qiao-file');
var Debug = require('debug');
var qiaoCli = require('qiao-cli');

// file
const debug = Debug('qiao-oss');

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
  app.client
    .put(dest, source)
    .then((result) => {
      if (cb) cb(null, result);
    })
    .catch((e) => {
      if (cb) cb(e);
    });
};

// qiao

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
  const bar = new qiaoCli.progress('uploading files... :current/:total', {
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
        if (err || !data || !data.res || data.res.statusCode != 200) {
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

// os

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

module.exports = init;
