// q
const q = require('qiao-console');

// vars
const values = require('./_values.js');
const handler = require('./_handler.js');
const callback = require('./_callback.js');
const complete = require('./_complete.js');

// normal
async function normal() {
  console.time('qiao-parallel');

  for (let i = 0; i < values.length; i++) {
    const value = values[i];

    const res = await handler(value);
    callback(i, res);
  }
  complete(values.length);

  console.timeEnd('qiao-parallel');
}

// test
(function () {
  q.clear();

  normal();
})();
