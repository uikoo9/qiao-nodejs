// ajax
import { get } from 'qiao-ajax';

// ip-regex
import i from 'ip-regex';

/**
 * get ip by website
 * @param {*} url
 * @param {*} timeout
 * @param {*} debug
 * @returns
 */
export const getIPByWebsite = (url, timeout, debug) => {
  // debug
  const label = `qiao-ip / ${Date.now()} / get ip from ${url}`;
  if (debug) console.time(label);

  // go
  return new Promise((resolve, reject) => {
    get(url, {
      timeout: timeout,
    })
      .then((res) => {
        // check
        if (!res || res.status !== 200 || !res.data) return reject(new Error('request ip failed'));

        // get ip
        const s = res.data.match(/\d+\.\d+\.\d+\.\d+/g);
        const ip = s && s.length ? s[0] : null;
        if (!ip) return reject(new Error('request ip failed: not ip'));

        // is ip
        const isIp = i.v4({ exact: true }).test(ip);
        if (!isIp) return reject(new Error('request ip failed: not ipv4'));

        // debug
        if (debug) console.timeEnd(label);

        // return
        return resolve(ip);
      })
      .catch((e) => {
        return reject(e);
      });
  });
};
