// mini css extract
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * rule for less
 * @param {*} isDev
 */
module.exports = function (isDev) {
  // use
  const use = [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  ];

  // return
  return {
    test: /\.less$/,
    use: use,
  };
};
