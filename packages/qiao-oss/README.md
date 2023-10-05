## qiao-oss

[![npm version](https://img.shields.io/npm/v/qiao-oss.svg?style=flat-square)](https://www.npmjs.org/package/qiao-oss)
[![npm downloads](https://img.shields.io/npm/dm/qiao-oss.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-oss)

nodejs 下阿里云 oss 常见 api 封装

## install

安装

```shell
npm i qiao-oss
```

## config.json

配置文件

```json
{
  "accessKeyId": "your access key id",
  "accessKeySecret": "your access secret",
  "region": "your region",
  "bucket": "your bucket"
}
```

## cli

也可以在 cli 下使用

```shell
# 全局安装
npm i -g qiao-oss

# 帮助
qoss
qoss -h

# 上传文件
qoss file|fi z:/workspaces/qiao-oss/test/config.json d:/test.js test.js

# 上传文件夹
qoss folder|fo z:/workspaces/qiao-oss/test/config.json d:/test/cooss test9
```

## api

### use

使用

```javascript
// cjs
const OSS = require('qiao-oss');

// mjs
import OSS from 'qiao-oss';
```

### qoss

```javascript
// config
const config = require('./config.json');

// qiao-oss
const qoss = OSS(config);
```

### uploadFile

上传文件

- destPath
  - 类型: string
  - 说明: oss 的目标路径
- sourceFile
  - 类型: string
  - 说明: 待上传的文件路径
- return
  - 类型: object
  - 说明: oss 返回的结果

```javascript
const destPath = 'test/test.js';
const sourceFile = '/your/test.js';

const rs = await qoss.uploadFile(destPath, sourceFile);
console.log(rs);
```

### uploadFolder

上传文件夹

- destPath
  - 类型: string
  - 说明: oss 的目标路径
- sourceFolder
  - 类型: string
  - 说明: 待上传的文件夹路径
- return
  - 类型: object
  - 说明: oss 返回的结果

```javascript
const destPath = 'test';
const sourceFolder = '/your/folder';

const rs = await qoss.uploadFolder(destPath, sourceFolder);
console.log(rs);
```
