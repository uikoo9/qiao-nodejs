## qiao-cos-cli

[![npm version](https://img.shields.io/npm/v/qiao-cos-cli.svg?style=flat-square)](https://www.npmjs.org/package/qiao-cos-cli)
[![npm downloads](https://img.shields.io/npm/dm/qiao-cos-cli.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-cos-cli)

tencent cos upload cli tool

## install

安装

```shell
# dev
npm i -D qiao-cos-cli

# global
npm i -g qiao-cos-cli
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

## api

也支持nodejs api使用，详见[qiao-cos](https://www.npmjs.com/package/qiao-cos)

## cli

```shell
# 全局安装
npm i -g qiao-cos-cli

# 帮助
qcos
qcos -h

# 上传文件
qcos file|fi z:/workspaces/qiao-cos-cli/test/config.json d:/test.js test.js
qcos fi ../qiao-cos/__tests__/config.json ../qiao-cos/__tests__/test.js test/test.js

# 上传文件夹
qcos folder|fo z:/workspaces/qiao-cos-cli/test/config.json d:/test/cocos test9
qcos fo ../qiao-cos/__tests__/config.json ../qiao-cos/src test
```
