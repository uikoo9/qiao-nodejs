## qiao-process

[![npm version](https://img.shields.io/npm/v/qiao-process.svg?style=flat-square)](https://www.npmjs.org/package/qiao-process)
[![npm downloads](https://img.shields.io/npm/dm/qiao-process.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-process)

nodejs 下 process 能力

## install

安装

```shell
npm i qiao-process
```

## use

使用

```javascript
// cjs
const { fork } = require('qiao-process');

// mjs
import { fork } from 'qiao-process';
```

## api

### fork & kill

```javascript
// path
const path = require('path');

// q
const { fork, kill } = require('qiao-process');

// test
function test() {
  const jsPath = path.resolve(__dirname, './cp.js');
  const args = ['haha'];

  const cp = fork(
    jsPath,
    args,
    function (msg) {
      console.log(`from child process: ${msg}`);
    },
    function (code) {
      console.log(`exit code: ${code}`);
    },
  );

  cp.send('hello child process');

  // kill cp
  setTimeout(function () {
    kill(cp.pid);
  }, 3000);
}

test();
```

### onMsg & send

```javascript
// qiao
const { onMsg, send } = require('qiao-process');

onMsg(function (msg) {
  console.log(`from main process: ${msg}`);
});

send('hello main process');
```
