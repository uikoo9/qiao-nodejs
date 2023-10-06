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
const { meta } = require('qiao-img');

// mjs
import { meta } from 'qiao-img';
```

## api

### meta

获取图片信息

- input
  - 类型: string|buffer
  - 说明: 待解析图片地址或buffer
- return
  - 类型: object
  - 说明: 图片信息
  - ```js
    {
        channels: 4,
        density: 72,
        depth: 'uchar',
        exif: Buffer @Uint8Array [],
        format: 'png',
        hasAlpha: true,
        hasProfile: true,
        height: 260,
        icc: Buffer @Uint8Array [],
        isProgressive: false,
        space: 'srgb',
        width: 506,
    }
    ```

```javascript
const info = await meta(input);
```
