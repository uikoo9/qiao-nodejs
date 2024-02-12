## qiao-get-ip

[![npm version](https://img.shields.io/npm/v/qiao-get-ip.svg?style=flat-square)](https://www.npmjs.org/package/qiao-get-ip)
[![npm downloads](https://img.shields.io/npm/dm/qiao-get-ip.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-get-ip)

Get public network ip under browser and node.js

## install

```shell
npm i qiao-get-ip
```

## usage

```javascript
// commonjs
const { getIP } = require('qiao-get-ip');

// es6
import { getIP } from 'qiao-get-ip';
```

## api

### getIP

get public network ip

- timeout
  - type: number
  - desc: timeout, ms, default: 300ms
- debug
  - type: boolean
  - desc: whether to display debug logs, default: false
- return
  - type: string
  - desc: ip

```javascript
// ip
const ip = await getIP(timeout);

// ip debug
const ip = await getIP(timeout, true);
```

## fast

Request the following websites and return the fastest response. The default timeout is 200ms

- [https://api.ipify.org/](https://api.ipify.org/)
- [https://icanhazip.com/](https://icanhazip.com/)
- [https://ipinfo.io/ip](https://ipinfo.io/ip)
- [https://ifconfig.me/ip](https://ifconfig.me/ip)
- [https://checkip.amazonaws.com/](https://checkip.amazonaws.com/)
- [http://txt.go.sohu.com/ip/soip](http://txt.go.sohu.com/ip/soip)
