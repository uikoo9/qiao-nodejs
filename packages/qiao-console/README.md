## qiao-console

[![npm version](https://img.shields.io/npm/v/qiao-console.svg?style=flat-square)](https://www.npmjs.org/package/qiao-console)
[![npm downloads](https://img.shields.io/npm/dm/qiao-console.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-console)

nodejs 下 console 常见 api 封装

## install

安装

```shell
npm i qiao-console
```

## use

使用

```javascript
// cjs
const { clear, writeLine } = require('qiao-console');

// mjs
import { clear, writeLine } from 'qiao-console';
```

## api

### clear

清空 console

```javascript
clear();
```

### writeLine

在 console 的某一行输出信息

- line
  - 类型: number
  - 说明: 行数
- content
  - 类型: string
  - 说明: 内容

```javascript
writeLine(line, content);
```

### others

```javascript
// clear line
clearLine();

// move to
moveTo(x, y);

// write
write(msg);

// write line xy
writeLineXY(x, y, msg);
```
