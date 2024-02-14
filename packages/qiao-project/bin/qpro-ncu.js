// qiao
const cli = require('qiao-cli');
const qpro = require('../index.js');

/**
 * ncu
 * @param {*} forceUpdate
 */
const ncu = async (forceUpdate) => {
  try {
    await qpro.ncuRun(forceUpdate);
  } catch (e) {
    console.log('qiao-project / ncu / error');
    console.log(e);
  }
};

// cmd for ncu
cli.cmd.command('ncu [forceUpdate]').description('ncu').action(ncu);
