## qiao-img-cli

[![npm version](https://img.shields.io/npm/v/qiao-img-cli.svg?style=flat-square)](https://www.npmjs.org/package/qiao-img-cli)
[![npm downloads](https://img.shields.io/npm/dm/qiao-img-cli.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-img-cli)

nodejs img cli tool

## install

安装

```shell
# dev
npm i -D qiao-img-cli

# global
npm i -g qiao-img-cli

# 由于依赖sharp，国内最好使用对应的源
npm_config_sharp_binary_host="https://npmmirror.com/mirrors/sharp" \
npm_config_sharp_libvips_binary_host="https://npmmirror.com/mirrors/sharp-libvips" \
npm i -g qiao-img-cli
```

## api

也支持nodejs api使用，详见[qiao-img](https://www.npmjs.com/package/qiao-img)

## cli

```shell
# 全局安装
npm i -g qiao-img-cli

# 帮助
qimg
qimg -h

# resize
qimg resize src width height fit

# convert
qimg convert src format

# meta
qimg meta src
```
