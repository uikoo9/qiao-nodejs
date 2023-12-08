// ava
const test = require('ava');

// path
const path = require('path');

// config
const config = require('./config.json');

// qiao-oss
const qoss = require('../index.js')(config);

// file
test.failing('upload file / ./', async (t) => {
  const destPath = 'test/test.js';
  const sourceFile = './test.js';

  const rs = await qoss.uploadFile(destPath, sourceFile);
  t.fail(rs);
});
test.failing('upload file / ../', async (t) => {
  const destPath = 'test/test.js';
  const sourceFile = '../index.js';

  const rs = await qoss.uploadFile(destPath, sourceFile);
  t.fail(rs);
});
test.skip('upload file / absolute file', async (t) => {
  const destPath = 'test/test.js';
  const sourceFile = path.resolve(__dirname, './test.js');
  t.log(`from: ${sourceFile}`);
  t.log(`to: ${destPath}`);

  const rs = await qoss.uploadFile(destPath, sourceFile);
  t.truthy(rs);
});

// folder
test.failing('upload folder / ./', async (t) => {
  const destPath = 'test';
  const sourceFolder = './src';

  const rs = await qoss.uploadFolder(destPath, sourceFolder);
  t.truthy(rs);
});
test.failing('upload folder / ../', async (t) => {
  const destPath = 'test';
  const sourceFolder = '../src';

  const rs = await qoss.uploadFolder(destPath, sourceFolder);
  t.truthy(rs);
});
test.skip('upload folder / absolute folder', async (t) => {
  const destPath = 'test';
  const sourceFolder = path.resolve(__dirname, '../src');

  const rs = await qoss.uploadFolder(destPath, sourceFolder);
  t.truthy(rs);
});
