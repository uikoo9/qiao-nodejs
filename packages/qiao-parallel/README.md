# qiao-parallel

[![npm version](https://img.shields.io/npm/v/qiao-parallel.svg?style=flat-square)](https://www.npmjs.org/package/qiao-parallel)
[![npm downloads](https://img.shields.io/npm/dm/qiao-parallel.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-parallel)

nodejs 下并行执行任务，详见：[一篇文章了解 JS 并行任务](https://blog.insistime.com/parallel)

## install

安装

```shell
npm i qiao-parallel
```

## use

使用

```javascript
// cjs
const { parallelByIIFE, parallelByFork, parallelByWorker } = require('qiao-parallel');

// mjs
import { parallelByIIFE, parallelByFork, parallelByWorker } from 'qiao-parallel';
```

## code

示例代码

### values

并行任务池

```javascript
module.exports = [100, 300, 200, 400];
```

### callback

单个任务完成回调

```javascript
// q
const q = require('qiao-console');

/**
 * callback
 * @param {*} index
 * @param {*} res
 */
module.exports = function (index, res) {
  q.writeLine(index, `${index} ${res}`);
};
```

### complete

所有任务完成回调

```javascript
// q
const q = require('qiao-console');

/**
 * complete
 * @param {*} l
 */
module.exports = function (l) {
  q.writeLine(l, 'complete');
};
```

### handler

模拟任务代码

```javascript
/**
 * handler
 * @param {*} timeout
 * @returns
 */
module.exports = function (timeout) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      return resolve(timeout);
    }, timeout);
  });
};
```

### handler fork js

模拟任务代码-fork 模式

```javascript
// handler
const handler = require('./_handler.js');

// fork handler
async function forkHandler() {
  // check
  if (!process || !process.argv) return;

  // value
  const value = parseInt(process.argv[2]);

  // msg
  const msg = await handler(value);
  process.send(msg);
}

forkHandler();
```

## api

### parallel by IIFE

```javascript
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
```

### parallel by fork

```javascript
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

  const jsPath = require('path').resolve(__dirname, './fork-handler.js');
  parallel.parallelByFork(jsPath, values, callback, complete);
})();
```

### parallel by worker

```javascript
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
```
