## qiao-zip

[![npm version](https://img.shields.io/npm/v/qiao-zip.svg?style=flat-square)](https://www.npmjs.org/package/qiao-zip)
[![npm downloads](https://img.shields.io/npm/dm/qiao-zip.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-zip)

nodejs 下 zip 和 unzip 工具

1. [Node.js 压缩为 zip 文件：archiver](https://blog.csdn.net/uikoo9/article/details/116381493)
2. [Node.js 解压缩 zip 文件：adm-zip](https://blog.csdn.net/uikoo9/article/details/116381396)
3. [qiao-zip：Node.js 下 zip 和 unzip](https://blog.csdn.net/uikoo9/article/details/116381568)

## install

安装

```shell
npm i qiao-zip
```

## use

使用

```javascript
// cjs
const { zip, unzip } = require('qiao-zip');

// mjs
import { zip, unzip } from 'qiao-zip';
```

## api

### unzip

解压缩 zip 文件

- zipFile
  - 类型: string
  - 说明: zip 文件路径
- destFolder
  - 类型: string
  - 说明: 解压缩目标文件夹
- return
  - 类型: boolean
  - 说明: 结果
  - true: 成功

```javascript
const res = await unzip(zipFile, destFolder);
```

### zip

压缩文件或文件夹

- src
  - 类型: string
  - 说明: 待压缩的文件或者文件夹
- dest
  - 类型: string
  - 说明: 压缩的目标路径
- subdir
  - 类型: boolean
  - 说明: 是否包含文件夹
  - 默认值: false
- return
  - 类型: boolean
  - 说明: 结果
  - true: 成功

```javascript
const res = await zip(src, dest);

// subdir，是否需要包一层
const res = await zip(src, dest, true);
```
