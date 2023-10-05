'use strict';

var qiaoZip = require('qiao-zip');

// qiao-zip

/**
 * zipIt
 * @param {*} src
 * @param {*} dest
 * @param {*} subdir
 * @returns
 */
const zipIt = async (src, dest, subdir) => {
  return await qiaoZip.zip(src, dest, subdir);
};

/**
 * unzipIt
 * @param {*} zipFile
 * @param {*} destFolder
 * @returns
 */
const unzipIt = async (zipFile, destFolder) => {
  return await qiaoZip.unzip(zipFile, destFolder);
};

exports.unzipIt = unzipIt;
exports.zipIt = zipIt;
