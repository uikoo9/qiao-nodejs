// ava
const test = require('ava');

// q
const { zip, unzip } = require('../index.js');

// test
test('zip file', async (t) => {
  const src = './index.js';
  const dest = './__tests__/1/zip_file.zip';
  const res = await zip(src, dest);
  t.true(res);
});
test('zip folder', async (t) => {
  const src = './src';
  const dest = './__tests__/1/zip_src.zip';
  const res = await zip(src, dest);
  t.true(res);
});
test.serial('zip folder with subdir', async (t) => {
  const src = './src';
  const dest = './__tests__/1/zip_src_subdir.zip';
  const res = await zip(src, dest, true);
  t.true(res);
});
test.serial('unzip', async (t) => {
  const src = './__tests__/1/zip_src_subdir.zip';
  const dest = './__tests__/1/unzip'
  const res = await unzip(src, dest, true);
  t.true(res);
});