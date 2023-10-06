// ava
const test = require('ava');

// qiao-img
const { file, buffer } = require('../index.js');

// file
test('file', async (t) => {
  const input = './__tests__/demo.png';
  const output = './__tests__/1/output_to_file.png';
  const res = await file(input, output);

  t.truthy(res);
});
test('file / png to jpg', async (t) => {
  const input = './__tests__/demo.png';
  const output = './__tests__/1/output_png_to_jpg.jpg';
  const res = await file(input, output);

  t.truthy(res);
});
test('file / png to jpg / with meta', async (t) => {
  const input = './__tests__/demo.png';
  const output = './__tests__/1/output_png_to_jpg_with_meta.jpg';
  const res = await file(input, output, true);

  t.truthy(res);
});
test('file / png to webp', async (t) => {
  const input = './__tests__/demo.png';
  const output = './__tests__/1/output_png_to_webp.webp';
  const res = await file(input, output);

  t.truthy(res);
});

// buffer
test('buffer', async (t) => {
  const input = './__tests__/demo.png';
  const res = await buffer(input);

  t.truthy(res);
});
