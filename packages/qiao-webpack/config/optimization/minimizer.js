// css mini
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// terser
const TerserPlugin = require('terser-webpack-plugin');

/**
 * minimizer
 */
module.exports = [
  new CssMinimizerPlugin(),
  new TerserPlugin({
    parallel: true,
    extractComments: false,
    terserOptions: {
      format: {
        comments: false,
      },
    },
  }),
];
