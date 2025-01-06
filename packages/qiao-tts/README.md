## qiao-tts

[![npm version](https://img.shields.io/npm/v/qiao-tts.svg?style=flat-square)](https://www.npmjs.org/package/qiao-tts)
[![npm downloads](https://img.shields.io/npm/dm/qiao-tts.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-tts)

nodejs tts tool

## install

安装

```shell
npm i qiao-tts
```

## use

使用

```javascript
// cjs
const { moyinTTS } = require('qiao-tts');

// mjs
import { moyinTTS } from 'qiao-tts';
```

## api

### moyinTTS

[魔音工坊](https://openapi.moyin.com/index)的tts能力封装

- options
  - 类型: object
  - 说明:

```javascript
await moyinTTS(options);
```
