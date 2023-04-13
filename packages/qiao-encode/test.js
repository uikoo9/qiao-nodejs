// ava
const test = require('ava');

// q
const {
  uuid,
  md5,
  AESEncrypt,
  AESDecrypt,
  TDESEncrypt,
  TDESDecrypt,
  randomNumber,
  randomLetterLower,
  randomLetterUpper,
  randomLetterAll,
  randomLetterNumber,
  randomIn,
} = require('./index.js');

// uuid
test('uuid / default', (t) => {
  const res = uuid();

  t.log(res);
  t.truthy(res);
});
test('uuid / v1', (t) => {
  const res = uuid(1);

  t.log(res);
  t.truthy(res);
});
test('uuid / v3', (t) => {
  const res = uuid(3);

  t.log(res);
  t.truthy(res);
});
test('uuid / v4', (t) => {
  const res = uuid(4);

  t.log(res);
  t.truthy(res);
});
test('uuid / v5', (t) => {
  const res = uuid(5);

  t.log(res);
  t.truthy(res);
});

// md5
test('md5 / default', (t) => {
  const res = md5('hello');

  t.log(res);
  t.truthy(res);
});
test('md5 / hex', (t) => {
  const res = md5('hello', 'hex');

  t.log(res);
  t.truthy(res);
});

// aes
test('aes', (t) => {
  const data = '{"nihao":"name"}';
  const key = '12345612345612345612345612345611';

  // encrypt
  const e = AESEncrypt(data, key);
  t.log(e);
  t.truthy(e);

  // decrypt
  const d = AESDecrypt(e, key);
  t.log(d);
  t.is(d, data);
});

// tdes
test('tdes', (t) => {
  const data = '{"nihao":"name"}';
  const key = '123456123456123456112233';

  // encrypt
  const e = TDESEncrypt(data, key);
  t.log(e);
  t.truthy(e);

  // decrypt
  const d = TDESDecrypt(e, key);
  t.log(d);
  t.is(d, data);
});

// random
const randomLength = 7;
test('random / number', (t) => {
  const res = randomNumber(randomLength);
  t.log(res);
  t.true(res && res.length == randomLength);
});
test('random / lower letter', (t) => {
  const res = randomLetterLower(randomLength);
  t.log(res);
  t.true(res && res.length == randomLength);
});
test('random / upper letter', (t) => {
  const res = randomLetterUpper(randomLength);
  t.log(res);
  t.true(res && res.length == randomLength);
});
test('random / all letter', (t) => {
  const res = randomLetterAll(randomLength);
  t.log(res);
  t.true(res && res.length == randomLength);
});
test('random / letter and number', (t) => {
  const res = randomLetterNumber(randomLength);
  t.log(res);
  t.true(res && res.length == randomLength);
});
test('random / random in', (t) => {
  const res = randomIn(0, 5);
  t.log(res);
  t.true(res >= 0 && res <= 5);
});
