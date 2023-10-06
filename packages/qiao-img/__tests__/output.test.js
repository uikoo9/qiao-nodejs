// ava
const test = require('ava');

// qiao-img
const { convert, buffer } = require('../index.js');

// convert
test('convert', async (t) => {
  const input = './__tests__/demo.png';
  const output = './__tests__/1/output_to_file.png';
  const res = await convert(input, output);

  t.truthy(res);
});
test('convert / png to jpg', async (t) => {
  const input = './__tests__/demo.png';
  const output = './__tests__/1/output_to_file.jpg';
  const res = await convert(input, output);

  t.truthy(res);
});
test('convert / png to webp', async (t) => {
  const input = './__tests__/demo.png';
  const output = './__tests__/1/output_to_file.webp';
  const res = await convert(input, output);

  t.truthy(res);
});

// buffer
test('buffer', async (t) => {
  const input = './__tests__/demo.png';
  const res = await buffer(input);

  t.truthy(res);
});
