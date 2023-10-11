// path
const path = require('path');

// qiao
const cli = require('qiao-cli');
const qimg = require('../index.js');

/**
 * resize
 * @param {*} src
 * @param {*} width
 * @param {*} height
 * @param {*} fit
 */
const resize = async (src, width, height, fit) => {
  try {
    const cwd = process.cwd();
    if (src.startsWith('./') || src.startsWith('../')) src = path.resolve(cwd, src);

    const res = await qimg.resizeIt(src, width, height, fit);
    if (!res) {
      console.log('qiao-img-cli / resize / fail!');
      console.log();
    } else {
      console.log('qiao-img-cli / resize / success!');
      console.log();
      console.log(res);
    }
  } catch (e) {
    console.log('qiao-img-cli / resize / fail!');
    console.log();

    console.log(e);
  }
};

// cmd for resize
cli.cmd.command('resize <src> <width> <height> <fit>').description('resize img to new width height').action(resize);
