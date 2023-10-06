// ava
const test = require('ava');

// qiao-img
const { meta } = require('../index.js');

// meta
test('meta', async (t) => {
  const input = './__tests__/demo.png';
  const info = await meta(input);

  t.truthy(info);
});
