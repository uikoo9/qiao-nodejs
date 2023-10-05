// mini
const minimizer = require('./minimizer.js');

// default cache groups
const defaultCacheGroups = require('./cache-groups.js');

/**
 * optimization
 * @param {*} cacheGroups
 * @returns
 */
module.exports = function (isDev, cacheGroups) {
  // check
  if (isDev) return {};

  // return
  return {
    // runtimeChunk: 'single',
    minimize: true,
    minimizer: minimizer,
    splitChunks: {
      cacheGroups: Object.assign(defaultCacheGroups, cacheGroups || {}),
    },
  };
};
