// ava
const test = require('ava');

// config
const config = require('./config.json');

// qiao-cos
const qcos = require('../index.js')(config);

// sts
test('sts', async (t) => {
  const durationSeconds = 1800;
  const allowPrefix = '';
  const sts = await qcos.getCredential(durationSeconds, allowPrefix);
  t.log(sts);
  t.truthy(sts);
});
