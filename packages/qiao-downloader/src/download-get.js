// http
import { http, https } from 'follow-redirects';

/**
 * get
 * @param {*} url
 * @param {*} maxRedirects - 最大重定向次数，默认 5
 * @returns
 */
export const get = (url, maxRedirects = 5) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const options = {
      maxRedirects: maxRedirects,
    };

    protocol
      .get(url, options, (res) => {
        // check
        if (!res || res.statusCode !== 200)
          return reject(new Error(`response status code is not 200: ${res.statusCode}`));

        // r
        resolve(res);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};
