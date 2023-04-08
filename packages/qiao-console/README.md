## qiao-console

[![npm version](https://img.shields.io/npm/v/qiao-console.svg?style=flat-square)](https://www.npmjs.org/package/qiao-console)
[![npm downloads](https://img.shields.io/npm/dm/qiao-console.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-console)

nodejs 下 console 常见 api 封装

## install

安装

```bash
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

## version

### 0.0.7.20230408

1. 优化测试用例和 readme
2. 3.0.0

### 0.0.6.20221108

1. es6

### 0.0.5.20220422

1. add lerna

### 0.0.4.20210318

1. modify md

### 0.0.3.20201104

1. modify md
2. add other method

### 0.0.2.20200807

1. modify md

### 0.0.1.20200806

1. init project
2. clear
3. write line
