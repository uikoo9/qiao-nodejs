// img
import { meta } from 'qiao-img';

// util
import { checkSupportFormat } from './_util.js';

// namespace
const namespace = 'qiao-img-cli';

/**
 * metaIt
 * @param {*} src
 * @returns
 */
export const metaIt = async (src) => {
  // method
  const methodName = 'meta';

  // const
  const srcs = src.split('.');
  const ext = srcs[srcs.length - 1].toLowerCase();
  console.log(`${namespace} / ${methodName} / src:`, src);
  console.log(`${namespace} / ${methodName} / ext:`, ext);

  // check
  if (!checkSupportFormat(ext)) {
    console.log(`${namespace} / ${methodName} / error: unsupport input format`);
    return;
  }

  // meta
  return await meta(src);
};
