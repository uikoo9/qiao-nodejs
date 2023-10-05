// path
const path = require('path');

// qiao
const cli = require('qiao-cli');
const qzip = require('../index.js');

/**
 * zip
 * @param {*} src
 * @param {*} dest
 * @param {*} subdir
 */
const zip = async (src, dest, subdir) => {
  try {
    const cwd = process.cwd();
    if (src.startsWith('./') || src.startsWith('../')) src = path.resolve(cwd, src);
    if (dest.startsWith('./') || dest.startsWith('../')) dest = path.resolve(cwd, dest);
    console.log(`qiao-zip-cli / src / ${src}`);
    console.log(`qiao-zip-cli / dest / ${dest}`);
    console.log(`qiao-zip-cli / subdir / ${subdir}`);

    const res = await qzip.zipIt(src, dest, subdir);
    console.log(`qiao-zip-cli / ${res}`);
  } catch (e) {
    console.log('qiao-zip-cli / fail!');
    console.log();

    console.log(e);
  }
};

// cmd for zip
cli.cmd.command('zip <src> <dest> [subdir]').description('zip file or folder').action(zip);
