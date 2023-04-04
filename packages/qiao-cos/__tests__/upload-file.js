// ava
const test = require('ava');

// config
const config = require('./config.json');

// qiao-cos
const qcos = require('../index.js')(config);

/**
 * upload file demo
 * upload /your/test.js to your bucket's test/test.js
 */
test('upload file', async (t) => {
  const destPath = 'test/test.js';
  const sourceFile = './index.js';

  const rs = await qcos.uploadFile(destPath, sourceFile);
  t.truthy(rs);
});
