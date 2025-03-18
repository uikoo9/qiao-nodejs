## qiao-translate

[![npm version](https://img.shields.io/npm/v/qiao-translate.svg?style=flat-square)](https://www.npmjs.org/package/qiao-translate)
[![npm downloads](https://img.shields.io/npm/dm/qiao-translate.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-translate)

火山云翻译服务

## install

安装

```shell
npm i qiao-translate
```

## use

使用

```javascript
// cjs
const QTranslate = require('qiao-translate');

// mjs
import QTranslate from 'qiao-translate';
```

## api

### translateTxt

文本翻译

- src
  - 类型: string
  - 说明: 源语言
- target
  - 类型: string
  - 说明: 目标语言
- txt
  - 类型: array
  - 说明: 待翻译文本数组

```javascript
const q = QTranslate({ ak, sk });
await q.translateTxt(src, target, txt);
```
