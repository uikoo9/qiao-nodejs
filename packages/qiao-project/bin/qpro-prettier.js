// path
const path = require('path');

// qiao
const cli = require('qiao-cli');
const qpro = require('../index.js');

/**
 * prettier
 * @param {*} configPath
 */
const prettier = async (configPath) => {
  try {
    // final path
    let finalPath;

    // config path
    if (configPath) {
      const cwd = process.cwd();
      if (configPath.startsWith('./') || configPath.startsWith('../')) configPath = path.resolve(cwd, configPath);
      finalPath = configPath;
    }

    // prettier
    await qpro.runPrettier(finalPath);
  } catch (e) {
    console.log('qiao-project / prettier / error');
    console.log(e);
  }
};

// cmd for prettier
cli.cmd.command('prettier [configPath]').description('prettier').action(prettier);
