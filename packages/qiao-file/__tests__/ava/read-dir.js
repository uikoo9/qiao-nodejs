// ava
const test = require('ava');

// q
const { readdir } = require('../../index.js');

// test
test('read dir', async (t) => {
  const dirpath = './__tests__';
  const res = await readdir(dirpath);
  t.log(res);
  t.truthy(res);
});
