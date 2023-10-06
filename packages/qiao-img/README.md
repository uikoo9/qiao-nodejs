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

### stats

获取生图信息

- input
  - 类型: string|buffer
  - 说明: 待解析图片地址或buffer
- return
  - 类型: object
  - 说明: 生图信息
  - ```js
    {
      channels: [
        {
          max: 249,
          maxX: 76,
          maxY: 45,
          mean: 38.72487838248708,
          min: 31,
          minX: 0,
          minY: 16,
          squaresSum: 320131661,
          stdev: 30.557190935522204,
          sum: 5094645,
        },
        {
          max: 220,
          maxX: 70,
          maxY: 208,
          mean: 39.68903922164792,
          min: 31,
          minX: 0,
          minY: 16,
          squaresSum: 346678450,
          stdev: 32.55647250213309,
          sum: 5221490,
        },
        {
          max: 250,
          maxX: 304,
          maxY: 47,
          mean: 40.46915475828519,
          min: 31,
          minX: 0,
          minY: 16,
          squaresSum: 390685258,
          stdev: 36.49511234838205,
          sum: 5324122,
        },
        {
          max: 255,
          maxX: 0,
          maxY: 16,
          mean: 255,
          min: 255,
          minX: 0,
          minY: 16,
          squaresSum: 8554689000,
          stdev: 0,
          sum: 33547800,
        },
      ],
      dominant: {
        b: 24,
        g: 24,
        r: 24,
      },
      entropy: 1.0418897804338485,
      isOpaque: true,
      sharpness: 4.37773835717497,
    }
    ```

```javascript
const info = await stats(input);
```

### buffer

获取图片的buffer信息

- input
  - 类型: string|buffer
  - 说明: 待解析图片地址或buffer
- return
  - 类型: object
  - 说明: buffer信息
  - ```js
    {
      data: Buffer @Uint8Array [],
      info: {
        channels: 4,
        format: 'png',
        height: 260,
        premultiplied: false,
        size: 22813,
        width: 506,
      },
    }
    ```

```javascript
const info = await buffer(input);
```
