## qiao-downloader

[![npm version](https://img.shields.io/npm/v/qiao-downloader.svg?style=flat-square)](https://www.npmjs.org/package/qiao-downloader)
[![npm downloads](https://img.shields.io/npm/dm/qiao-downloader.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-downloader)

nodejs 下载文件工具, [Node.js-开发实践：下载文件](https://blog.vincentqiao.com/nodejs-download)

## install

安装

```shell
npm install qiao-downloader
```

## use

使用

```javascript
// cjs
const { download } = require('qiao-downloader');

// mjs
import { download } from 'qiao-downloader';
```

## download

下载文件

- url
  - 类型: string
  - 说明: 下载文件的 url
- dest
  - 类型: string
  - 说明: 下载文件的目标路径
- options
  - options.timeout
    - 类型: number
    - 说明: 下载文件的超时时间，单位 ms
  - options.onProgress
    - 类型: function
    - 说明: 下载进度，返回保留 3 位的小数
- return
  - 类型: string
  - 说明: 下载成功后返回目标路径

```javascript
// download
const res = await download(url, dest, options);
```
