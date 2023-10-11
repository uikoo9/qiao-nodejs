// ava
const test = require('ava');

// qiao-img
const { resize } = require('../index.js');

// resize
test('resize', async (t) => {
  const input = './__tests__/demo.png';
  const output = './__tests__/1/100x100.png';
  const options = {
    width: 100,
    height: 100,
    fit: 'cover',
  };
  const resizeRes = await resize(input, output, options);
  if (resizeRes && resizeRes.width === 100 && resizeRes.height === 100) {
    t.pass();
  } else {
    t.fail();
  }
});
