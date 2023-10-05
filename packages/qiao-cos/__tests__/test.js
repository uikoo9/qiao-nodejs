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
  const sourceFile = path.resolve(__dirname, './test.js');
  t.log(`from: ${sourceFile}`);
  t.log(`to: ${destPath}`);

  const rs = await qcos.uploadFile(destPath, sourceFile);
  t.truthy(rs);
});

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

// cdn
test('cdn sign', (t) => {
  const destPath = '/202309/2e266e54-8ddc-42d9-a772-a24514c5d17b.png';
  const url = qcos.cdnSign(destPath);
  t.truthy(url);
});
