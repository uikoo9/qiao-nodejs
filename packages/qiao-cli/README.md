## qiao-cli

[![npm version](https://img.shields.io/npm/v/qiao-cli.svg?style=flat-square)](https://www.npmjs.org/package/qiao-cli)
[![npm downloads](https://img.shields.io/npm/dm/qiao-cli.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-cli)

nodejs 下 cli 能力

## install

安装

```bash
npm i qiao-cli
```

## use

使用

```javascript
// cjs
const cli = require('qiao-cli');

// mjs
import cli from 'qiao-cli';
```

## api

### colors

控制台颜色

```javascript
console.log(cli.colors.green('hello'));
```

### progress

控制台进度条

```javascript
const bar = new cli.progress(':bar', { total: 10 });
const timer = setInterval(() => {
  bar.tick();

  if (bar.complete) {
    console.log('\ncomplete\n');
    clearInterval(timer);
  }
}, 100);
```

### ask

控制台交互问答

```javascript
const questions = [
  {
    type: 'list',
    name: 'type',
    message: 'What type of code do you want to generate?',
    choices: ['front', 'server', 'manage'],
  },
];

const answers = await cli.ask(questions);
console.log(answers);
```

### cmd

控制台命令行

```javascript
cli.cmd
  .version('0.0.1', '-v, --version')
  .usage('<command> [options]')
  .description('qiao-cli is a nodejs cli tool')
  .command('test <dir>')
  .option('-s --ss', 'ss')
  .action((dir, options) => {
    console.log(dir, options);
  });

// parse
cli.cmd.parse(process.argv);
```

## version

### 0.1.0.20230407

1. 3.0.0

### 0.0.9.20221103

1. 1.0.0

### 0.0.8.20200803

1. ncu

### 0.0.7.20191205

1. update packages
2. add funding

### 0.0.6.20190808

1. update npms

### 0.0.5.20190128

1. add progress

### 0.0.4.20190109

1. update inquirer@6.2.1
2. add colors

### 0.0.3.20181127

1. cmd.js
2. add.js

### 0.0.2.20181120

1. add commander

### 0.0.1.20181023

1. init project
2. add inquirer
3. add ask method
