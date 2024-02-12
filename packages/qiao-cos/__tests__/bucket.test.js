// ava
const test = require('ava');

// config
const config = require('./config.json');

// qiao-cos
const qcos = require('../index.js')(config);

// bucket
test.skip('list bucket', async (t) => {
  const res = await qcos.listBuckets();
  t.truthy(res);
});
test.skip('list objects', async (t) => {
  const res = await qcos.listObjects('13_insistime_editor/', 2);
  t.truthy(res);
});
test.skip('list objects all', async (t) => {
  const res = await qcos.listObjectsAll('13_insistime_editor/');
  t.log(res.length);
  t.pass();
});
