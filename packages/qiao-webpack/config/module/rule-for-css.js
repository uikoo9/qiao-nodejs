// mini css extract
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * rule for css
 * @param {*} isDev
 * @param {*} cssIncludes
 * [
 *  /node_modules[\\/]antd/
 * ]
 */
module.exports = function (isDev, cssIncludes) {
  // use
  const use = [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: {
        modules: false,
      },
    },
  ];

  // default css includes
  const defaultCssIncludes = [/node_modules[\\/]@wangeditor/, /node_modules[\\/]prismjs/];

  // return
  return {
    test: /\.css$/,
    include: defaultCssIncludes.concat(cssIncludes || []),
    use: use,
  };
};
