// qiao
const cli = require('qiao-cli');

// cmd for common
cli.cmd
  .version(require('../package.json').version, '-v, --version')
  .description('qiao-cos-cli, tencent cos upload cli tool')
  .usage('<command> [options]');
