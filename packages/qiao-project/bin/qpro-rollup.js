// path
const path = require('path');

// qiao
const cli = require('qiao-cli');
const qpro = require('../index.js');

/**
 * rollup
 * @param {*} configPath
 */
const rollup = async (configPath) => {
  try {
    // final path
    let finalPath;

    // config path
    if (configPath) {
      const cwd = process.cwd();
      if (configPath.startsWith('./') || configPath.startsWith('../')) configPath = path.resolve(cwd, configPath);
      finalPath = configPath;
    }

    // eslint
    await qpro.rollupBuild(finalPath);
  } catch (e) {
    console.log('qiao-project / rollup / error');
    console.log(e);
  }
};

// cmd for rollup
cli.cmd.command('rollup [configPath]').description('rollup').action(rollup);
