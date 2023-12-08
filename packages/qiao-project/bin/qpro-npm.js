// path
const path = require('path');

// qiao
const cli = require('qiao-cli');
const qpro = require('../index.js');

/**
 * npm
 * @param {*} configPath
 */
const npm = async (configPath) => {
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
    await qpro.checkNPMPackage(finalPath);
  } catch (e) {
    console.log('qiao-project / npm / error');
    console.log(e);
  }
};

// cmd for npm
cli.cmd.command('npm-check [configPath]').description('check npm packages').action(npm);
