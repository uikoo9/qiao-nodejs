// webpack
const webpack = require('webpack');

// webpack dev server
const WebpackDevServer = require('webpack-dev-server');

// log util
const logUtil = require('./log.js');

// webpack config
const webpackConfig = require('../config/webpack.js');

/**
 * analyzer
 */
exports.analyzer = function (configPath, target) {
  const configJs = webpackConfig.build(configPath, target, true);
  if (!configJs) process.exit(1);

  webpackCompiler(configJs);
};

/**
 * build
 */
exports.build = function (configPath, target) {
  const configJs = webpackConfig.build(configPath, target);
  if (!configJs) process.exit(1);

  webpackCompiler(configJs);
};

/**
 * dev
 */
exports.dev = function (configPath, target) {
  // config js
  const configJs = webpackConfig.dev(configPath, target);
  if (!configJs) process.exit(1);

  // compiler
  const compiler = webpack(configJs);

  // dev server options
  const devServerOptions = configJs.devServer;

  // server
  const server = new WebpackDevServer(devServerOptions, compiler);
  server.start();
};

// webpack compiler
function webpackCompiler(configJs) {
  const compiler = webpack(configJs);
  compiler.run(function (err, stats) {
    const hasError = logUtil.showErr(err, stats);
    if (hasError) process.exit(1);

    logUtil.log();
    logUtil.suc('build success!');
    logUtil.log();

    logUtil.showStats(stats);
  });
}
