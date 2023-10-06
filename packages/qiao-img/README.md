## qiao-img

[![npm version](https://img.shields.io/npm/v/qiao-img.svg?style=flat-square)](https://www.npmjs.org/package/qiao-img)
[![npm downloads](https://img.shields.io/npm/dm/qiao-img.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-img)

nodejs img tool

## install

安装

```shell
#
npm i qiao-img

# 由于依赖sharp，国内最好使用对应的源
npm_config_sharp_binary_host="https://npmmirror.com/mirrors/sharp" \
npm_config_sharp_libvips_binary_host="https://npmmirror.com/mirrors/sharp-libvips" \
npm i qiao-img
```

## use

使用

```javascript
// cjs
const { convert } = require('qiao-img');

// mjs
import { convert } from 'qiao-img';
```
