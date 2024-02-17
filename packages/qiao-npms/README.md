## qiao-npms

[![npm version](https://img.shields.io/npm/v/qiao-npms.svg?style=flat-square)](https://www.npmjs.org/package/qiao-npms)
[![npm downloads](https://img.shields.io/npm/dm/qiao-npms.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-npms)

浏览器和 nodejs 下获取 npm 信息

## install

安装

```shell
npm i qiao-npms
```

## use

使用

```javascript
// cjs
const { downloadCountsLastDay } = require('qiao-npms');

// mjs
import { downloadCountsLastDay } from 'qiao-npms';
```

## api

### downloadCountsLastDay

获取前一天的 npm 包下载量

- packageName
  - 类型: string
  - 说明: npm 包名
- return
  - 类型: object
  - 说明: npm 包下载相关信息
  - ```javascript
    {
      downloads: 29,
      start: '2023-04-12',
      end: '2023-04-12',
      package: 'qiao-cos'
    }
    ```

```javascript
await downloadCountsLastDay(packageName);
```

### downloadCountsLastWeek

获取前一周的 npm 包下载量

- packageName
  - 类型: string
  - 说明: npm 包名
- return
  - 类型: object
  - 说明: npm 包下载相关信息

```javascript
await downloadCountsLastWeek(packageName);
```

### downloadCountsLastMonth

获取前一月的 npm 包下载量

- packageName
  - 类型: string
  - 说明: npm 包名
- return
  - 类型: object
  - 说明: npm 包下载相关信息

```javascript
await downloadCountsLastMonth(packageName);
```

### downloadCounts

获取 npm 包下载量

- packageName
  - 类型: string
  - 说明: npm 包名
- type
  - 类型: string
  - 说明: npm 包下载量统计类型, 'last-day', 'last-week', 'last-month'
- return
  - 类型: object
  - 说明: npm 包下载相关信息

```javascript
await downloadCounts(packageName, 'last-day');
```

### getVersion

获取 npm 包最新版本号

- packageName
  - 类型: string
  - 说明: npm 包名
- return
  - 类型: string
  - 说明: npm 包最新版本号

```javascript
await getVersion(packageName);
```

### searchPackages

搜索 npm 包

- packageName
  - 类型: string
  - 说明: npm 包名
- return
  - 类型: object[]
  - 说明: 搜索结果
  - ```javascript
    [
      {
        name: 'qiao-cos',
        scope: 'unscoped',
        version: '0.4.3',
        description: 'tencent cos upload tool on nodejs',
        keywords: [ 'tencent', 'cos', 'upload', 'tool', 'nodejs' ],
        date: 2022-06-13T08:06:26.354Z,
        links: {
          npm: 'https://www.npmjs.com/package/qiao-cos',
          homepage: 'https://code.insistime.com/#qiao-cos',
          repository: 'https://github.com/uikoo9/qiao-nodejs',
          bugs: 'https://github.com/uikoo9/qiao-nodejs/issues'
        },
        author: { name: 'uikoo9', email: 'uikoo9@qq.com' },
        publisher: { username: 'npm_insistime', email: 'npm@insistime.com' },
        maintainers: [ [Object] ]
      }
    ]
    ```

```javascript
await searchPackages(packageName);
```
