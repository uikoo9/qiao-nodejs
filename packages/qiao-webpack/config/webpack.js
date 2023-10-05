// path
const path = require('path');

// webpack merge
const merge = require('webpack-merge').merge;

// webpack options
const webpack_options = require('./webpack-options.js');

/**
 * webpack build config
 */
exports.build = function (configPath, target, isAnalyzer) {
  // qiao.webpack.js
  const qiaoWebpack = getQiaoWebpackJs(configPath);
  if (!qiaoWebpack) return;

  // options
  const options = webpack_options(false, qiaoWebpack, isAnalyzer);

  // opt
  const opt = {};
  opt.entry = qiaoWebpack.entry;
  opt.output = qiaoWebpack.output;
  opt.resolve = qiaoWebpack.resolve;

  // target
  if (target) opt.target = target;

  // merge
  return merge(options, opt);
};

/**
 * webpack dev config
 */
exports.dev = function (configPath, target) {
  // qiao.webpack.js
  const qiaoWebpack = getQiaoWebpackJs(configPath);
  if (!qiaoWebpack) return;

  // options
  const options = webpack_options(true, qiaoWebpack);

  // opt
  const opt = {};
  opt.entry = qiaoWebpack.entry;
  opt.output = qiaoWebpack.output;
  opt.resolve = qiaoWebpack.resolve;
  opt.devServer = qiaoWebpack.devServer;

  // target
  if (target) opt.target = target;

  // merge
  return merge(options, opt);
};

// get qiao webpack js
function getQiaoWebpackJs(configPath) {
  const cwd = process.cwd();
  if (configPath.startsWith('./')) configPath = path.resolve(cwd, configPath);

  let qiaoWebpack;
  try {
    qiaoWebpack = require(configPath);
  } catch (e) {
    console.log(e);
  }

  return qiaoWebpack;
}
