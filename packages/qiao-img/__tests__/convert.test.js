// ava
const test = require('ava');

// qiao-img
const { convert } = require('../index.js');

// convert
test('convert', async (t) => {
  const input = './__tests__/demo.png';
  const output = './__tests__/1/convert_png_to_jpg.jpg';
  const info = await convert(input, output, null, 'jpeg', {});

  t.log(info);
  t.truthy(info);
});
