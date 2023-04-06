// ava
const test = require('ava');

// q
const { rm, cp, mv } = require('../index.js');

// const
const PATH_NOT_EXISTS = '/path/not/exists';

// before
test.before(async (t) => {
  const dirpath = './__tests__/1';
  const res = await rm(dirpath);
  t.log('clear', res);
});

// cp file
test.serial('copy file / normal', async (t) => {
  const res = await cp('./index.js', './__tests__/1/cp/index.js');
  t.true(res);
});
test.serial('copy file / src not exists', async (t) => {
  const res = await cp(PATH_NOT_EXISTS, './__tests__/1/cp/index.js');
  t.falsy(res);
});
test.serial('copy file / dest is exists', async (t) => {
  const res = await cp('./index.js', './__tests__/1/cp/index.js');
  t.true(res);
});

// cp folder
test.serial('copy folder / normal', async (t) => {
  const res = await cp('./src', './__tests__/1/cp/src');
  t.true(res);
});
test.serial('copy folder / src not exists', async (t) => {
  const res = await cp(PATH_NOT_EXISTS, './__tests__/1/cp/src');
  t.falsy(res);
});
test.serial('copy folder / dest is exists', async (t) => {
  const res = await cp('./src', './__tests__/1/cp/src');
  t.true(res);
});


// mv file
test.serial('mv file / normal', async (t) => {
  const res = await mv('./__tests__/1/cp/index.js', './__tests__/1/mv/index.js');
  t.true(res);
});
test.serial('mv file / src not exists', async (t) => {
  const res = await mv(PATH_NOT_EXISTS, './__tests__/1/mv/index.js');
  t.falsy(res);
});
test.serial('mv file / dest is exists', async (t) => {
  const res = await mv('./__tests__/1/cp/src/index.js', './__tests__/1/mv/index.js');
  t.true(res);
});
// test.serial('mv file', async (t) => {
//   const res = await mv('./__tests__/1/cp/index.js', './__tests__/1/mv/index.js');
//   t.true(res);
// });
