/**
 * rule for react
 *  npm i -D babel-loader @babel/core @babel/preset-react
 * react hmr
 *  npm i -D @pmmmwh/react-refresh-webpack-plugin react-refresh
 */
module.exports = function (isDev) {
  // options
  const options = { presets: ['@babel/preset-react'] };
  if (isDev) options.plugins = ['react-refresh/babel'];

  return {
    test: /\.jsx$/,
    use: [
      {
        loader: 'babel-loader',
        // exclude : /node_modules/,
        options: options,
      },
    ],
  };
};
