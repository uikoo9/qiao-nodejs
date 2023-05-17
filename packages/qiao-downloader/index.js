'use strict';

var url = require('url');
var qiaoFile = require('qiao-file');
var http = require('http');
var https = require('https');
var Debug = require('debug');

// url

/**
 * check url
 * @param {*} checkUrl
 * @returns
 */
const checkUrl = (inputUrl) => {
  // check
  if (!inputUrl) return;

  // check url
  const url$1 = new url.URL(inputUrl);
  if (!url$1) return;

  // check protocol
  return url$1.protocol === 'http:' || url$1.protocol === 'https:';
};

// fs

/**
 * check dest
 * @param {*} dest
 * @returns
 */
const checkDest = async (dest) => {
  // check dest
  if (!dest) return;

  // absolute dest
  const destIsAbsolute = qiaoFile.path.isAbsolute(dest);
  if (!destIsAbsolute) dest = qiaoFile.path.resolve(process.cwd(), dest);

  // mkdir
  const dir = qiaoFile.path.dirname(dest);
  const mkdirRes = await qiaoFile.mkdir(dir);
  if (!mkdirRes) return;

  // return
  return dest;
};

// http

/**
 * get
 * @param {*} url
 * @returns
 */
const get = (url) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol
      .get(url, (res) => {
        // check
        if (!res || res.statusCode !== 200) return reject(new Error('response status code is not 200'));

        // r
        resolve(res);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

// data
let data = 0;

/**
 * on progress
 * @param {*} res
 * @param {*} onProgress
 * @returns
 */
const onDownloadProgress = (res, onProgress) => {
  // check res
  if (!res) return;

  // check progress
  if (!onProgress) return;

  // check content
  const contentLength = res.headers['content-length'];
  if (!contentLength) return;

  // total
  const total = parseInt(contentLength, 10);

  // on data
  res.on('data', (chunk) => {
    data = data + chunk.length;

    const p = (data / total).toFixed(3);
    const n = parseFloat(p);
    onProgress(n);
  });
};

// fs
const debug$1 = Debug('qiao-downloader');

/**
 * checkSize
 * @param {*} res
 * @param {*} dest
 */
const checkSize = async (res, dest) => {
  // check
  if (!res || !dest) return;

  // res length
  const resLength = res.headers['content-length'];
  if (!resLength) return;

  // fs length
  try {
    const s = await qiaoFile.fs.stat(dest);
    if (!s || !s.size) return;

    return parseInt(resLength, 10) === s.size;
  } catch (error) {
    debug$1(error);
  }
};

// fs
const debug = Debug('qiao-downloader');

/**
 * reject error
 * @param {*} e
 * @returns
 */
const rejectError = (e) => {
  return Promise.reject(typeof e === 'string' ? new Error(e) : e);
};

/**
 * clear timeout
 * @param {*} timeoutId
 * @param {*} timeout
 * @returns
 */
const clearTimeoutFn = (timeoutId, timeout) => {
  if (!timeoutId || !timeout) return;

  clearTimeout(timeoutId);
};

/**
 * clear file
 * @param {*} dest
 * @returns
 */
const clearFile = async (dest) => {
  // check
  const isExistsRes = await qiaoFile.isExists(dest);
  debug('clear / is exists', isExistsRes);
  if (!isExistsRes) return;

  // rm
  const rmRes = await qiaoFile.rm(dest);
  debug('clear / rm', rmRes);
  if (!rmRes) return;

  // suc
  debug('clear / success');
};

// fs

/**
 * download go
 * @param {*} res
 * @param {*} dest
 * @param {*} timeout
 * @returns
 */
const downloadGo = (res, dest, timeout) => {
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
    const file = qiaoFile.fs.createWriteStream(dest);
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

// check

/**
 * download
 * @param {*} url
 * @param {*} dest
 * @param {*} options
 * @returns
 */
const download = async (url, dest, options) => {
  // check url
  if (!checkUrl(url)) return rejectError('url is not valid');

  // check dest
  const newDest = await checkDest(dest);
  if (!newDest) return rejectError('dest is not valid');

  // options
  const { timeout, onProgress } = options || {};

  // get
  let res;
  try {
    res = await get(url);

    // on progress
    onDownloadProgress(res, onProgress);
  } catch (error) {
    return rejectError(error);
  }

  // file
  return downloadGo(res, newDest, timeout);
};

exports.download = download;
