## qiao-encode

[![npm version](https://img.shields.io/npm/v/qiao-encode.svg?style=flat-square)](https://www.npmjs.org/package/qiao-encode)
[![npm downloads](https://img.shields.io/npm/dm/qiao-encode.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-encode)

nodejs 下加密，随机等能力

## install

安装

```shell
npm i qiao-encode
```

## use

使用

```javascript
// cjs
const { md5 } = require('qiao-encode');

// mjs
import { md5 } from 'qiao-encode';
```

## api

### md5

md5

- data
  - 类型: string
  - 说明: 内容
- encoding
  - 类型: string
  - 说明: 编码，'base64', 'hex', 默认为 base64
- return
  - 类型: string
  - 说明: 结果

```javascript
// md5
md5(data);

// md5, encoding
md5(data, encoding);
```

### uuid

uuid

- version
  - 类型: number
  - 说明: uuid 版本，1，3，4，5，默认为 4
- return
  - 类型: string
  - 说明: 结果

```javascript
// uuid, default
uuid();

// uuid, version
uuid(version);
```

### aes

aes

- data
  - 类型: string
  - 说明: 待加密或解密内容
- key
  - 类型: string
  - 说明: 秘钥
- iv
  - 类型: string
  - 说明: iv，默认为空
- encoding
  - 类型: string
  - 说明: 编码，默认为 base64
- return
  - 类型: string
  - 说明: 结果

```javascript
// encrypt
AESEncrypt(data, key);

// decrypt
AESDecrypt(data, key);

// iv, encoding
AESEncrypt(data, key, iv, encoding);
AESDecrypt(data, key, iv, encoding);
```

### 3des

3des

- data
  - 类型: string
  - 说明: 待加密或解密内容
- key
  - 类型: string
  - 说明: 秘钥
- iv
  - 类型: string
  - 说明: iv，默认为空
- encoding
  - 类型: string
  - 说明: 编码，默认为 base64
- return
  - 类型: string
  - 说明: 结果

```javascript
// tdes, default
TDESEncrypt(data, key);
TDESDecrypt(data, key);

// tdes, iv, encoding
TDESEncrypt(data, key, iv, encoding);
TDESDecrypt(data, key, iv, encoding);
```

### random

随机数字，字母等

```javascript
// random number
randomNumber(length);

// random lower letter
randomLetterLower(length);

// random upper letter
randomLetterUpper(length);

// random all letter
randomLetterAll(length);

// random all letter and number
randomLetterNumber(length);

// random seed
randomSeed(seed, length);

// random by seed
randomBySeed(seed);

// random in
randomIn(min, max);
```

## version

### 0.1.0.20221025

1. 1.0.0

### 0.0.9.20220511

1. qiao-encode

### 0.0.8.20200803

1. ncu

### 0.0.7.20191204

1. update packages
2. add funding

### 0.0.6.20190116

1. add md5

### 0.0.5.20181128

1. add random

### 0.0.4.20181127

1. add uuid

### 0.0.3.20181122

1. npm audit

### 0.0.2.20181115

1. add crypt method

### 0.0.1.20181112

1. init project
2. modify md
