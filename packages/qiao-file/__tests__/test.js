// ava
const test = require('ava');

// q
const { cp, mv } = require('../index.js');

// cp
test.serial('copy file / normal', async (t) => {
  const src = './index.js';
  const dest = './__tests__/1/cp/index.js';
  const res = await cp(src, dest);
  t.true(res);
});
test.serial('copy file / src not exists', async (t) => {
  const src = '/path/not/exists';
  const dest = './__tests__/1/cp/index.js';
  const res = await cp(src, dest);
  t.falsy(res);
});
test.serial('copy file / dest is exists', async (t) => {
  const src = './index.js';
  const dest = './__tests__/1/cp/index.js';
  const res = await cp(src, dest);
  t.true(res);
});
test.serial('copy folder', async (t) => {
  const src = './src';
  const dest = './__tests__/1/cp/src';
  const res = await cp(src, dest);
  t.true(res);
});

// mv
// test.serial('mv folder', async (t) => {
//   const res = await mv('./__tests__/1/cp/src1', './__tests__/1/mv/src');
//   t.true(res);
// });
// test.serial('mv file', async (t) => {
//   const res = await mv('./__tests__/1/cp/index.js', './__tests__/1/mv/index.js');
//   t.true(res);
// });
