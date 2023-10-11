// path
const path = require('path');

// qiao
const cli = require('qiao-cli');
const qimg = require('../index.js');

/**
 * meta
 * @param {*} src
 */
const meta = async (src) => {
  try {
    const cwd = process.cwd();
    if (src.startsWith('./') || src.startsWith('../')) src = path.resolve(cwd, src);

    const res = await qimg.metaIt(src);
    if (!res) {
      console.log('qiao-img-cli / meta / fail!');
      console.log();
    } else {
      console.log('qiao-img-cli / meta / success!');
      console.log();
      console.log(res);
    }
  } catch (e) {
    console.log('qiao-img-cli / meta / fail!');
    console.log();

    console.log(e);
  }
};

// cmd for meta
cli.cmd.command('meta <src>').description('get img meta info').action(meta);
