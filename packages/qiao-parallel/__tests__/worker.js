// q
const q = require('qiao-console');

// vars
const values = require('./_values.js');
const callback = require('./_callback.js');
const complete = require('./_complete.js');

// parallel
const parallel = require('../index.js');

// test
(function () {
  q.clear();

  const jsPath = require('path').resolve(__dirname, './worker-handler.js');
  parallel.parallelByWorker(jsPath, values, callback, complete);
})();
