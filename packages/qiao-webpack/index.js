// log util
const logUtil = require('./lib/log.js');

/**
 * server
 * @param {*} serverPath
 * @param {*} port
 * @returns
 */
exports.server = function (serverPath, port) {
  if (!serverPath) {
    logUtil.danger('qiao-webpack / server / need serverPath');
    return;
  }

  return {
    port: port || 5299,
    static: serverPath,
  };
};

/**
 * output
 * @param {*} outputPath
 * @returns
 */
exports.output = function (outputPath) {
  if (!outputPath) {
    logUtil.danger('qiao-webpack / output / need outputPath');
    return;
  }

  return {
    clean: true,
    path: outputPath,
    filename: '[name].[contenthash:8].js',
  };
};
