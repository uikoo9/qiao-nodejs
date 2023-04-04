// ava
const test = require('ava');

// q
const { zip } = require('../../index.js');

// test
test('copy file', async (t) => {
  const src = './index.js';
  const dest = './__tests__/1/copy_file.zip';
  const res = await zip(src, dest);
  t.true(res);
});