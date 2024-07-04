## qiao-ssh

[![npm version](https://img.shields.io/npm/v/qiao-ssh.svg?style=flat-square)](https://www.npmjs.org/package/qiao-ssh)
[![npm downloads](https://img.shields.io/npm/dm/qiao-ssh.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-ssh)

nodejs ssh tool

## install

安装

```shell
npm i qiao-ssh
```

## use

使用

```javascript
// cjs
const { sshCMD } = require('qiao-ssh');

// mjs
import { sshCMD } from 'qiao-ssh';
```

## api

### sshCMD

连接服务器，并执行命令

- options
  - 类型: object
  - 说明: host, port, username, password
- cmd
  - 类型: string
  - 说明: 执行命令
- return
  - 类型: string
  - 说明: 结果

```javascript
await sshCMD(options, cmd);
```
