// webpack bundle analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 * webpack bundle analyzer
 * @returns
 */
module.exports = function () {
  return new BundleAnalyzerPlugin();
};
