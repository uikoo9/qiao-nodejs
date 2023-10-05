## qiao-lerna

[![npm version](https://img.shields.io/npm/v/qiao-lerna.svg?style=flat-square)](https://www.npmjs.org/package/qiao-lerna)
[![npm downloads](https://img.shields.io/npm/dm/qiao-lerna.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-lerna)

lerna tools，详见：[一篇文章学会 Lerna](https://blog.insistime.com/lerna)

## install

安装

```shell
npm i -g qiao-npms
```

## cli

### dc

```shell
# 列出文件夹下所有npm包上一个月的下载量
qlerna dc ./packages
```

### pkg

```shell
# 列出文件夹下所有npm包的dependencies
qlerna pkg ./packages

# 列出文件夹下所有npm包的devDependencies
qlerna pkg ./packages dev
```
