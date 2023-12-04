/**
 * https://webpack.docschina.org/guides/asset-modules/
 */
module.exports = {
  test: /\.(png|jpe?g|gif|svg|webp|eot|ttf|woff|woff2)$/i,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 4 * 1024,
    },
  },
};
