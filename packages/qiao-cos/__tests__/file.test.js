// ava
const test = require('ava');

// path
const path = require('path');

// config
const config = require('./config.json');

// qiao-cos
const qcos = require('../index.js')(config);

// file
test.failing('upload file / ./', async (t) => {
  const destPath = 'test/test.js';
  const sourceFile = './test.js';

  const rs = await qcos.uploadFile(destPath, sourceFile);
  t.fail(rs);
});
test.failing('upload file / ../', async (t) => {
  const destPath = 'test/test.js';
  const sourceFile = '../index.js';

  const rs = await qcos.uploadFile(destPath, sourceFile);
  t.fail(rs);
});
test('upload file / absolute file', async (t) => {
  const destPath = 'test/test.js';
  const sourceFile = path.resolve(__dirname, './file.test.js');
  t.log(`from: ${sourceFile}`);
  t.log(`to: ${destPath}`);

  const rs = await qcos.uploadFile(destPath, sourceFile);
  t.truthy(rs);
});
