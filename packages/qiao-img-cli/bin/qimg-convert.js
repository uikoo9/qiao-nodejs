// path
const path = require('path');

// qiao
const cli = require('qiao-cli');
const qimg = require('../index.js');

/**
 * convert
 * @param {*} src
 * @param {*} format
 */
const convert = async (src, format) => {
  try {
    const cwd = process.cwd();
    if (src.startsWith('./') || src.startsWith('../')) src = path.resolve(cwd, src);

    const res = await qimg.convertIt(src, format);
    if (!res) {
      console.log('qiao-img-cli / convert / fail!');
      console.log();
    } else {
      console.log('qiao-img-cli / convert / success!');
      console.log();
      console.log(res);
    }
  } catch (e) {
    console.log('qiao-img-cli / convert / fail!');
    console.log();

    console.log(e);
  }
};

// cmd for convert
cli.cmd.command('convert <src> <format>').description('convert img to new format').action(convert);
