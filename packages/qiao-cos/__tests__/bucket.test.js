// ava
const test = require('ava');

// config
const config = require('./config.json');

// qiao-cos
const qcos = require('../index.js')(config);

// bucket
test('list bucket', async (t) => {
  const res = await qcos.listBuckets();
  t.truthy(res);
});
