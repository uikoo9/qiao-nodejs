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
      channels: [],
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

### file

将图片输出到文件

- input
  - 类型: string|buffer
  - 说明: 待解析图片地址或buffer
- output
  - 类型: string
  - 说明: 输出的图片地址
- meta
  - 类型: boolean|object
  - 说明:
    - true: 保留metadata
    - object: 写入的metadata，详见: [https://sharp.pixelplumbing.com/api-output#withmetadata](https://sharp.pixelplumbing.com/api-output#withmetadata)
- return
  - 类型: object
  - 说明: 文件信息
  - ```js
    {
      channels: 4,
      format: 'png',
      height: 260,
      premultiplied: false,
      size: 22813,
      width: 506,
    }
    ```

```javascript
const info = await file(input, output, meta);

// remove metadata
const info = await file(input, output);

// hold metadata
const info = await file(input, output, true);

// replace metadata
const info = await file(input, output, {});
```

### buffer

获取图片的buffer信息

- input
  - 类型: string|buffer
  - 说明: 待解析图片地址或buffer
- meta
  - 类型: boolean|object
  - 说明:
    - true: 保留metadata
    - object: 写入的metadata，详见: [https://sharp.pixelplumbing.com/api-output#withmetadata](https://sharp.pixelplumbing.com/api-output#withmetadata)
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

// remove metadata
const info = await buffer(input);

// hold metadata
const info = await buffer(input, true);

// replace metadata
const info = await buffer(input, {});
```

### convert

图片转换

- input
  - 类型: string|buffer
  - 说明: 待解析图片地址或buffer
- output
  - 类型: string
  - 说明: 输出的图片地址
- meta
  - 类型: boolean|object
  - 说明:
    - true: 保留metadata
    - object: 写入的metadata，详见: [https://sharp.pixelplumbing.com/api-output#withmetadata](https://sharp.pixelplumbing.com/api-output#withmetadata)
- convertType
  - 类型: string
  - 说明: 转换格式，包括（'jpeg', 'png', 'webp', 'gif', 'jp2', 'tiff', 'avif', 'heif', 'jxl'）
- convertOptions
  - 类型: object
  - 说明: 转换的参数，详见: [https://sharp.pixelplumbing.com/api-output#jpeg](https://sharp.pixelplumbing.com/api-output#jpeg)
- return
  - 类型: object
  - 说明: 文件信息
  - ```js
    {
      channels: 4,
      format: 'png',
      height: 260,
      premultiplied: false,
      size: 22813,
      width: 506,
    }
    ```

```javascript
const info = await convert(input, output, meta, convertType, convertOptions);

// to jpg
const info = await convert(input, output, null, 'jpeg', {});
```

### resize

图片缩放

- input
  - 类型: string|buffer
  - 说明: 待解析图片地址或buffer
- output
  - 类型: string
  - 说明: 输出的图片地址
- options
  - 类型: object
  - 说明: resize选项
- return
  - 类型: object
  - 说明: 文件信息

```javascript
const info = await resize(input, output, options);
```
