// ava
const test = require('ava');

// q
const { lsdir } = require('../../index.js');

// test
test('ls dir', async (t) => {
  const dirpath = './__tests__';
  const res = await lsdir(dirpath);

  t.log(res);
  t.truthy(res);
});
