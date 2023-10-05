// md5
const { md5 } = require('qiao-encode');

/**
 * sign img
 * @param {*} key
 * @param {*} filepath
 * @param {*} timeout s
 * @returns
 */
export const cdnSign = (key, filepath, timeout) => {
  // check
  if (!key) {
    console.log('qiao-cos-li / cdnSign / need config.key');
    return;
  }
  if (!filepath) {
    console.log('qiao-cos-li / cdnSign / need filepath');
    return;
  }

  // str
  const now = parseInt(Date.now() / 1000) + (timeout || 0);
  const str = key + filepath + now;

  // md5
  const md5Str = md5(str, 'hex');

  // url
  return `${filepath}?sign=${md5Str}&t=${now}`;
};
