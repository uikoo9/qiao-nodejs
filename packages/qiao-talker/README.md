## qiao-talker

[![npm version](https://img.shields.io/npm/v/qiao-talker.svg?style=flat-square)](https://www.npmjs.org/package/qiao-talker)
[![npm downloads](https://img.shields.io/npm/dm/qiao-talker.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-talker)

nodejs image talker

## install

安装

```shell
npm i qiao-talker
```

## use

使用

```javascript
// cjs
const { checkFace } = require('qiao-talker');

// mjs
import { checkFace } from 'qiao-talker';
```

## api

### checkFace

检测图片是否包含脸部

- options
  - 类型: object
  - 说明:

```javascript
await checkFace(options);
```
