## qiao-file

[![npm version](https://img.shields.io/npm/v/qiao-file.svg?style=flat-square)](https://www.npmjs.org/package/qiao-file)
[![npm downloads](https://img.shields.io/npm/dm/qiao-file.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-file)

nodejs 下文件相关封装

1. [Node.js-开发实践：高性能 FS](https://blog.vincentqiao.com/nodejs-fs)
2. [Node.js-开发实践：使用健壮的 FS](https://blog.vincentqiao.com/nodejs-fs-extra)

## install

安装

```shell
npm i qiao-file
```

## use

使用

```javascript
// cjs
const { isExists } = require('qiao-file');

// mjs
import { isExists } from 'qiao-file';
```

## api

### extname

获取文件的后缀

- filePath
  - 类型: string
  - 说明: 文件地址
- return
  - 类型: string
  - 说明: 文件后缀，例如.js

```javascript
const res = extname(filePath);
```

### isExists

判断文件或者文件夹是否存在

- fpath
  - 类型: string
  - 说明: 文件或者文件夹地址
- return
  - 类型: boolean
  - 说明: 结果
  - true: 存在

```javascript
const res = await isExists(fpath);
```

### isDir

判断文件路径是否为文件夹

- fpath
  - 类型: string
  - 说明: 文件或者文件夹地址
- return
  - 类型: boolean
  - 说明: 结果
  - true: 是文件夹

```javascript
const res = await isDir(fpath);
```

### cp

复制文件或文件夹

- src
  - 类型: string
  - 说明: 文件或文件夹地址
- dest
  - 类型: string
  - 说明: 目标文件或文件夹地址，如果 dest 存在，默认会覆盖
- return
  - 类型: boolean
  - 说明: 结果
  - true: 成功

```javascript
const res = await cp(src, dest);
```

### mv

移动文件或文件夹

- src
  - 类型: string
  - 说明: 文件或文件夹地址
- dest
  - 类型: string
  - 说明: 目标文件或文件夹地址，如果 dest 存在，默认会覆盖
- return
  - 类型: boolean
  - 说明: 结果
  - true: 成功

```javascript
const res = await mv(src, dest);
```

### rm

删除文件或文件夹

- path
  - 类型: string
  - 说明: 文件或文件夹地址
- return
  - 类型: boolean
  - 说明: 结果
  - true: 成功

```javascript
const res = await rm(path);
```

### mkdir

创建文件夹

- dirpath
  - 类型: string
  - 说明: 文件夹地址
- return
  - 类型: boolean
  - 说明: 结果
  - true: 成功

```javascript
const res = await mkdir(dirpath);
```

### readdir

读取文件夹内容

- dirpath
  - 类型: string
  - 说明: 文件夹地址
- return
  - 类型: string[]
  - 说明: dirpath 下的文件或文件夹路径
  - ```javascript
    ['path', ...]
    ```

```javascript
const res = await readdir(dirpath);
```

### lsdir

列出文件夹下所有的文件和文件夹路径

- dirpath
  - 类型: string
  - 说明: 文件夹地址
- return
  - 类型: object
  - 说明: dirpath 下的文件或文件夹路径
  - ```javascript
    {
      files: [
        {
          name: 'index.js',
          path: '/path/to/index.js',
        },
        ...
      ],
      folders: [
        {
          name: '1',
          path: '/path/to/1',
        },
        ...
      ],
    }
    ```

```javascript
const res = await lsdir(dirpath);
```

### lstree

列出文件夹下所有的文件和文件夹信息，以树的方式

- dirpath
  - 类型: string
  - 说明: 文件夹地址
- ignores
  - 类型: string[]
  - 说明：需要过滤的路径
- return

  - 类型: object[]
  - 说明: dirpath 下的文件和文件夹信息，以树的方式
  - ```javascript
    [
      {
        children: [],
        name: 'filename',
        path: '',
      },
    ];
    ```

```javascript
const dirpath = 'xx';
const ignores = ['node_modules', 'is-'];
const res = await lstree(dirpath, ignores);
```

### readFile

读取文件内容

- filePath
  - 类型: string
  - 说明: 文件地址
- return
  - 类型: string
  - 说明: 文件内容

```javascript
const res = await readFile(filePath);
```

### readFileLineByLine

按行读取文件

- filePath
  - 类型: string
  - 说明: 文件地址
- onLine
  - 类型: function
  - 说明: 每行的回调函数
- onClose
  - 类型: function
  - 说明: 整个文件读取完毕的回调函数

```javascript
readFileLineByLine(filePath, onLine, onClose);
```

### writeFile

写文件

- filePath
  - 类型: string
  - 说明: 文件地址
- content
  - 类型: string
  - 说明: 文件内容
- return
  - 类型: boolean
  - 说明: 结果
  - true: 成功

```javascript
const res = await writeFile(filePath, content);
```
