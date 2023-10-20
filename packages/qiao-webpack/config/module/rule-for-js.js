/**
 * rule for js
 *  npm i -D babel-loader @babel/core @babel/preset-env
 */
module.exports = {
  test: /\.(?:js|mjs|cjs)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              edge: '17',
              firefox: '60',
              chrome: '67',
              safari: '11.1',
            },
            useBuiltIns: 'usage',
            corejs: '3.33.0',
          },
        ],
      ],
    },
  },
};
