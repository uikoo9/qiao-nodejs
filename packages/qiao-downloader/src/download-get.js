// http
import http from 'http';
import https from 'https';

/**
 * get
 * @param {*} url
 * @returns
 */
export const get = (url) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol
      .get(url, (res) => {
        // check
        if (!res || res.statusCode !== 200) return reject(new Error('response status code is not 200'));

        // r
        resolve(res);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};
