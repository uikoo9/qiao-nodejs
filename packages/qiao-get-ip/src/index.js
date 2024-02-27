// get ip
import { getIPByWebsite } from './get-ip.js';

// urls
const urls = [
  'https://api.ipify.org/',
  'https://icanhazip.com/',
  'https://ipinfo.io/ip',
  'https://ifconfig.me/ip',
  'https://checkip.amazonaws.com/',
  'http://txt.go.sohu.com/ip/soip',
];

// default timeout
const defaultTimeout = 300;

/**
 *
 */
export const getIP = (timeout, debug) => {
  // timeout
  timeout = timeout || defaultTimeout;

  // promises
  const promises = urls.map(function (url) {
    return getIPByWebsite(url, timeout, debug);
  });

  // return
  return new Promise((resolve, reject) => {
    Promise.any(promises)
      .then((ip) => {
        resolve(ip);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
