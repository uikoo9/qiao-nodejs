## qiao-cos

[![npm version](https://img.shields.io/npm/v/qiao-cos.svg?style=flat-square)](https://www.npmjs.org/package/qiao-cos)
[![npm downloads](https://img.shields.io/npm/dm/qiao-cos.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-cos)

nodejs 下腾讯云 cos 常见 api 封装

## install

安装

```shell
npm i qiao-cos
```

## config.json

配置文件

```javascript
{
    "SecretId": "your secret id",
    "SecretKey": "your secret key",
    "Region": "your bucket",
    "Bucket": "your bucket",
}
```

## cli

也支持cli使用，详见[qiao-cos-cli](https://www.npmjs.com/package/qiao-cos-cli)

## use

使用

```javascript
// cjs
const COS = require('qiao-cos');

// mjs
import COS from 'qiao-cos';
```

## qcos

实例

```javascript
// config
const config = require('./config.json');

// qiao-cos
const qcos = COS(config);
```

## sts

认证相关

### getCredential

获取临时秘钥

- durationSeconds
  - 类型: number
  - 说明: 秘钥过期时间，单位秒，默认为1800
- allowPrefix
  - 类型: string
  - 说明: 允许访问的地址前缀
- return
  - 类型: object
  - 说明: 临时秘钥等数据

```javascript
const sts = await qcos.getCredential(durationSeconds, allowPrefix);
```

## cdn

cdn相关操作

### cdnSign

cos配套的cdn鉴权

- destPath
  - 类型: string
  - 说明: cos 的目标路径，这里以/开头
- timeout
  - 类型: number
  - 说明: 有效时间，单位是秒
- return
  - 类型: string
  - 说明: 添加sign和t后的url
- 备注
  - config.json中需要添加signKey
  - 详见：[https://cloud.tencent.com/document/product/228/41625](https://cloud.tencent.com/document/product/228/41625)

```javascript
const destPath = '/202309/2e266e54-8ddc-42d9-a772-a24514c5d17b.png';

// timeout is 0
const url = qcos.cdnSign(destPath);

// timeout is 10s
const url = qcos.cdnSign(destPath, 10);
```

## bucket

bucket相关操作

### listBuckets

列出存储桶

- return
  - 类型: object
  - 说明: 存储桶相关信息

```javascript
const res = await qcos.listBuckets();
```

### listObjects

列出对象列表

- prefix
  - 类型: string
  - 说明: 筛选的前缀
- max
  - 类型: number
  - 说明: 单次返回最大条数，默认1000，最大1000
- marker
  - 类型: string
  - 说明: 上次返回的结尾
- return
  - 类型: object
  - 说明: 对象相关信息

```javascript
const res = await qcos.listObjects();
```

### listObjectsAll

列出所有对象

- prefix
  - 类型: string
  - 说明: 筛选的前缀
- max
  - 类型: number
  - 说明: 单次返回最大条数，默认1000，最大1000
- return
  - 类型: object
  - 说明: 对象相关信息

```javascript
const res = await qcos.listObjectsAll();
```

## object

object相关操作

### delObject

删除对象

- key
  - 类型: string
  - 说明: 对象名称
- return
  - 类型: object
  - 说明: 删除结果

```javascript
const res = await qcos.delObject(key);
```

## upload

### uploadFile

上传文件

- destPath
  - 类型: string
  - 说明: cos 的目标路径
- sourceFile
  - 类型: string
  - 说明: 待上传的文件路径
- return
  - 类型: object
  - 说明: cos 返回的结果

```javascript
const destPath = 'test/test.js';
const sourceFile = '/your/test.js';

const rs = await qcos.uploadFile(destPath, sourceFile);
console.log(rs);
```

### uploadFolder

上传文件夹

- destPath
  - 类型: string
  - 说明: cos 的目标路径
- sourceFolder
  - 类型: string
  - 说明: 待上传的文件夹路径
- return
  - 类型: object
  - 说明: cos 返回的结果

```javascript
const destPath = 'test';
const sourceFolder = '/your/folder';

const rs = await qcos.uploadFolder(destPath, sourceFolder);
console.log(rs);
```
