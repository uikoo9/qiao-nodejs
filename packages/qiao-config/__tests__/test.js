// ava
const test = require('ava');

// db
const db = require('../index.js')();

// config
test.serial('config / clear and all', async (t) => {
  // clear and all
  await db.clear();
  const all = await db.all();
  t.deepEqual(all, {});
});
test.serial('config / set and get', async (t) => {
  // set and get
  await db.config('test', 'hello');
  const value = await db.config('test');
  t.deepEqual(value, 'hello');
});
test.serial('config / del', async (t) => {
  // del
  await db.config('test', null);
  const delValue = await db.config('test');
  t.falsy(delValue);
});