## qiao-ssh

[![npm version](https://img.shields.io/npm/v/qiao-ssh.svg?style=flat-square)](https://www.npmjs.org/package/qiao-ssh)
[![npm downloads](https://img.shields.io/npm/dm/qiao-ssh.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-ssh)

nodejs 下加密，随机等能力

## install

安装

```shell
npm i qiao-ssh
```

## use

使用

```javascript
// cjs
const { md5 } = require('qiao-ssh');

// mjs
import { md5 } from 'qiao-ssh';
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
