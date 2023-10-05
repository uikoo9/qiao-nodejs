// ava
const test = require('ava');

// path
const path = require('path');

// config
const config = require('./config.json');

// qiao-cos
const qcos = require('../index.js')(config);

// folder
test.failing('upload folder / ./', async (t) => {
  const destPath = 'test';
  const sourceFolder = './src';

  const rs = await qcos.uploadFolder(destPath, sourceFolder);
  t.truthy(rs);
});
test.failing('upload folder / ../', async (t) => {
  const destPath = 'test';
  const sourceFolder = '../src';

  const rs = await qcos.uploadFolder(destPath, sourceFolder);
  t.truthy(rs);
});
test('upload folder / absolute folder', async (t) => {
  const destPath = 'test';
  const sourceFolder = path.resolve(__dirname, '../src');

  const rs = await qcos.uploadFolder(destPath, sourceFolder);
  t.truthy(rs);
});
