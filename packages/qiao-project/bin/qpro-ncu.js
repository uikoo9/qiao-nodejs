// path
const path = require('path');

// qiao
const cli = require('qiao-cli');
const qpro = require('../index.js');

/**
 * ncu
 * @param {*} configPath
 */
const ncu = async (configPath) => {
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
    await qpro.ncuRun(finalPath);
  } catch (e) {
    console.log('qiao-project / ncu / error');
    console.log(e);
  }
};

// cmd for ncu
cli.cmd.command('ncu [configPath]').description('ncu').action(ncu);
