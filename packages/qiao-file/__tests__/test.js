// ava
const test = require('ava');

// q
const { rm, cp, mv, mkdir, readdir, lsdir, lstree, extname, readFile, writeFile, isExists, isDir } = require('../index.js');

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

// mv folder
test.serial('mv folder / normal', async (t) => {
  const res = await mv('./__tests__/1/cp/src', './__tests__/1/mv/src');
  t.true(res);
});
test.serial('mv folder / src not exists', async (t) => {
  const res = await mv(PATH_NOT_EXISTS, './__tests__/1/mv/src');
  t.falsy(res);
});
test.serial('mv folder / dest is exists', async (t) => {
  const res = await mv('./__tests__/1/cp', './__tests__/1/mv');
  t.true(res);
});

// rm
test.serial('rm file / normal', async (t) => {
  await cp('./src', './__tests__/1/rm/src');

  const res = await rm('./__tests__/1/rm/src/index.js');
  t.true(res);
});
test.serial('rm folder / normal', async (t) => {
  const res = await rm('./__tests__/1/rm/src');
  t.true(res);
});
test.serial('rm / path not exists', async (t) => {
  const res = await rm(PATH_NOT_EXISTS);
  t.true(res);
});

// mkdir
test('mkdir', async (t) => {
  const res = await mkdir('./__tests__/1/mkdir/3/4');
  t.true(res);
});
test('mkdir again', async (t) => {
  const res = await mkdir('./__tests__/1/mkdir/3/4');
  t.true(res);
});

// readdir
test('readdir', async (t) => {
  const res = await readdir('./__tests__');
  t.true(res && res.length === 2);
});
test('readdir / dir not exists', async (t) => {
  const res = await readdir(PATH_NOT_EXISTS);
  t.false(res);
});

// lsdir
test('lsdir', async (t) => {
  const res = await lsdir('./__tests__');
  t.truthy(res && res.files && res.files.length && res.folders && res.folders.length);
});

// lstree
test('lstree', async (t) => {
  const ignores = ['node_modules', 'is-'];
  const res = await lstree('./', ignores);

  t.truthy(res && res.length);
});

// extname
test('extname is .js', (t) => {
  const res = extname('./extname.js');
  t.is(res, '.js');
});

// read file
test('read file', async (t) => {
  const res = await readFile('./index.js');
  t.truthy(res);
});
test('read file / path not exists', async (t) => {
  const res = await readFile(PATH_NOT_EXISTS);
  t.falsy(res);
});

// write file
test('write file', async (t) => {
  const res = await writeFile('./__tests__/1/write-file/1.js', 'test');
  t.true(res);
});

// is exists
test('isExists / path is exists', async (t) => {
  const res = await isExists('./__tests__/test.js');
  t.true(res);
});
test('isExists / path not exists', async (t) => {
  const res = await isExists(PATH_NOT_EXISTS);
  t.false(res);
});

// is dir
test('isDir / path is dir', async (t) => {
  const res = await isDir('./__tests__');
  t.true(res);
});
test('isDir / path not dir', async (t) => {
  const res = await isDir('./__tests__/test.js');
  t.false(res);
});
