// path
const path = require('path');

// qiao
const cli = require('qiao-cli');

// commitizen
const { bootstrap } = require('commitizen/dist/cli/git-cz');

/**
 * commitizen
 */
const commitizen = () => {
  bootstrap({
    cliPath: path.join(process.cwd(), './node_modules/commitizen'),
    config: {
      path: 'cz-conventional-changelog',
    },
  });
};

// cmd for commitizen
cli.cmd
  .command('commitizen [configPath]')
  .description('commitizen')
  .action(() => {
    process.argv.pop();
    commitizen();
  });
