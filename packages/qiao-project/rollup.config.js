/**
 * rollup.config.js
 */
module.exports = {
  input: 'src/index.js',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  external: [
    'qiao-file',
    'qiao-cli',
    'qiao-console',
    'qiao-parallel',
    'qiao-npms',
    'prettier',
    'eslint',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'rollup',
    '@rollup/plugin-json',
    '@rollup/plugin-node-resolve',
  ],
};
