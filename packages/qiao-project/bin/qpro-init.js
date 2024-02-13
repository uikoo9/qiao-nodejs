// path
const path = require('path');

// qiao
const cli = require('qiao-cli');
const qpro = require('../index.js');

/**
 * init
 * @param {*} root
 */
const init = async (root) => {
  try {
    // final path
    let finalPath;

    // root path
    if (root) {
      const cwd = process.cwd();
      if (root.startsWith('./') || root.startsWith('../')) root = path.resolve(cwd, root);
      finalPath = root;
    }

    // eslint
    await qpro.init(finalPath);
  } catch (e) {
    console.log('qiao-project / init / error');
    console.log(e);
  }
};

// cmd for init
cli.cmd.command('init <rootPath>').description('init project').action(init);
