// qiao
const cli = require('qiao-cli');

// cmd for common
cli.cmd
  .version(require('../package.json').version, '-v, --version')
  .description('qiao-zip-cli, nodejs zip and unzip cli tool')
  .usage('<command> [options]');
