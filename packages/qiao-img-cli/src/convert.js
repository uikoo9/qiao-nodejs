// img
import { file } from 'qiao-img';

// util
import { checkSupportFormat } from './_util.js';

// namespace
const namespace = 'qiao-img-cli';

/**
 * convertIt
 * @param {*} src
 * @param {*} format
 * @returns
 */
export const convertIt = async (src, format) => {
  // method
  const methodName = 'convert';

  // const
  const srcs = src.split('.');
  const ext = srcs[srcs.length - 1].toLowerCase();
  const outputFormat = format.toLowerCase();
  console.log(`${namespace} / ${methodName} / src:`, src);
  console.log(`${namespace} / ${methodName} / ext:`, ext);
  console.log(`${namespace} / ${methodName} / format:`, outputFormat);

  // check
  if (!checkSupportFormat(ext)) {
    console.log(`${namespace} / ${methodName} / error: unsupport input format`);
    return;
  }
  if (!checkSupportFormat(outputFormat)) {
    console.log(`${namespace} / ${methodName} / error: unsupport output format`);
    return;
  }

  // output
  const output = `${src}_convert.${outputFormat}`;
  console.log(`${namespace} / ${methodName} / output:`, output);

  // convert
  return await file(src, output);
};
