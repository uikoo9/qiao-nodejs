// q
const q = require('qiao-console');

// vars
const values = require('./_values.js');
const handler = require('./_handler.js');
const callback = require('./_callback.js');
const complete = require('./_complete.js');

// parallel
const parallel = require('../index.js');

// test
(function () {
  q.clear();

  parallel.parallelByIIFE(handler, values, callback, complete);
})();
