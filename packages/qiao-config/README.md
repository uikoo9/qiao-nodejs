## qiao-config

[![npm version](https://img.shields.io/npm/v/qiao-config.svg?style=flat-square)](https://www.npmjs.org/package/qiao-config)
[![npm downloads](https://img.shields.io/npm/dm/qiao-config.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-config)

nodejs 下基于本地文件的 config 能力

## install

安装

```shell
npm i qiao-config
```

## use

使用

```javascript
// cjs
const DB = require('qiao-config');

// mjs
import DB from 'qiao-config';
```

## db

db 实例

```javascript
// default
const db = DB();

// custom
const db = DB('/custom/path/to/db.json');
```

## api

### all

获取所有信息

- return
  - 类型: object
  - 说明: 所有信息

```javascript
const all = await db.all();
```

### clear

清空所有信息

```javascript
await db.clear();
```

### config

获取，设置，删除数据

- key
  - 类型: string
  - 说明: 只传入 key 时，获取信息
- value
  - 类型: any
  - 说明:
    - 设置信息时，传入 key 和 value
    - 删除信息时传入 null
- return
  - 类型: any
  - 说明: 获取信息是返回 value，其他无返回

```javascript
// get
await db.config(key);

// set
await db.config(key, value);

// del
await db.config(key, null);
```
