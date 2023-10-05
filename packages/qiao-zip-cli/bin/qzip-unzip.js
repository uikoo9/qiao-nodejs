// path
const path = require('path');

// qiao
const cli = require('qiao-cli');
const qzip = require('../index.js');

/**
 * unzip
 * @param {*} zipFile
 * @param {*} destFolder
 */
const unzip = async (zipFile, destFolder) => {
  try {
    const cwd = process.cwd();
    if (zipFile.startsWith('./') || zipFile.startsWith('../')) zipFile = path.resolve(cwd, zipFile);
    if (destFolder.startsWith('./') || destFolder.startsWith('../')) destFolder = path.resolve(cwd, destFolder);

    const res = await qzip.unzipIt(zipFile, destFolder);
    console.log(`qiao-zip-cli / ${res}`);
  } catch (e) {
    console.log('qiao-zip-cli / fail!');
    console.log();

    console.log(e);
  }
};

// cmd for unzip
cli.cmd.command('unzip <zipFile> <destFolder>').description('unzip file').action(unzip);
