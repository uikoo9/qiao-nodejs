## qiao-zip-cli

[![npm version](https://img.shields.io/npm/v/qiao-zip-cli.svg?style=flat-square)](https://www.npmjs.org/package/qiao-zip-cli)
[![npm downloads](https://img.shields.io/npm/dm/qiao-zip-cli.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-zip-cli)

nodejs zip and unzip cli took

## install

安装

```shell
# dev
npm i -D qiao-zip-cli

# global
npm i -g qiao-zip-cli
```

## api

也支持nodejs api使用，详见[qiao-zip](https://www.npmjs.com/package/qiao-zip)

## cli

### help

帮助

```shell
# 帮助
qzip
qzip -h
```

### zip

zip文件或者文件夹

```shell
# zip
qzip zip src dest subdir

# zip file
qzip zip ../qiao-zip/index.js ../qiao-zip/__tests__/1/zip_file.zip

# zip folder
qzip zip ../qiao-zip/__tests__ ../qiao-zip/__tests__/1/zip_folder.zip
```

### unzip

unzip 文件

```shell
# unzip
qzip unzip src dest

# unzip file
qzip unzip ../qiao-zip/__tests__/1/zip_file.zip ../qiao-zip/index1.js
```
