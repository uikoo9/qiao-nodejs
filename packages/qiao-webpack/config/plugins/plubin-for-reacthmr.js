// react hmr
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

/**
 * react hmr
 * @returns
 */
module.exports = function () {
  return new ReactRefreshWebpackPlugin();
};
