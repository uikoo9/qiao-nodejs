// ava
const test = require('ava');

// qiao-img
const { meta, stats } = require('../index.js');

// meta
test('meta', async (t) => {
  const input = './__tests__/demo.png';
  const info = await meta(input);

  t.truthy(info);
});
test.failing('meta / not exists', async (t) => {
  const input = './__tests__/demo1.png';
  const info = await meta(input);

  t.truthy(info);
});

// stats
test('stats', async (t) => {
  const input = './__tests__/demo.png';
  const info = await stats(input);

  t.truthy(info);
});
