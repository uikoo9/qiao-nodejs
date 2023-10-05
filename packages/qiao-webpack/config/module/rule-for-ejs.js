/**
 * rule for ejs
 */
module.exports = {
  test: /\.ejs$/i,
  use: ['html-loader', 'template-ejs-loader'],
};
