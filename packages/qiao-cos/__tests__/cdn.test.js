// ava
const test = require('ava');

// config
const config = require('./config.json');

// qiao-cos
const qcos = require('../index.js')(config);

// cdn
test.skip('cdn sign', (t) => {
  const destPath = '/202309/2e266e54-8ddc-42d9-a772-a24514c5d17b.png';
  const url = qcos.cdnSign(destPath);
  t.truthy(url);
});
