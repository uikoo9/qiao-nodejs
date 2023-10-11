'use strict';

var qiaoImg = require('qiao-img');

// resize fit
const resizeFit = ['cover', 'contain', 'fill', 'inside', 'outside'];

// support format
const supportFormat = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

/**
 * checkResizeFit
 * @param {*} fit
 * @returns
 */
const checkResizeFit = (fit) => {
  return resizeFit.indexOf(fit) > -1;
};

/**
 * checkSupportFormat
 * @param {*} fotmat
 * @returns
 */
const checkSupportFormat = (fotmat) => {
  return supportFormat.indexOf(fotmat) > -1;
};

// img

// namespace
const namespace$2 = 'qiao-img-cli';

/**
 * resizeIt
 * @param {*} src
 * @param {*} width
 * @param {*} height
 * @param {*} fit
 */
const resizeIt = async (src, width, height, fit) => {
  // method
  const methodName = 'resize';
  console.log(`${namespace$2} / ${methodName} / src:`, src);
  console.log(`${namespace$2} / ${methodName} / width:`, width);
  console.log(`${namespace$2} / ${methodName} / height:`, height);
  console.log(`${namespace$2} / ${methodName} / fit:`, fit);

  // const
  const srcs = src.split('.');
  const ext = srcs[srcs.length - 1].toLowerCase();
  const widthInt = parseInt(width);
  const heightInt = parseInt(height);
  console.log(`${namespace$2} / ${methodName} / ext:`, ext);

  // check
  if (!checkSupportFormat(ext)) {
    console.log(`${namespace$2} / ${methodName} / error: unsupport format`);
    return;
  }
  if (isNaN(widthInt) && isNaN(heightInt)) {
    console.log(`${namespace$2} / ${methodName} / error: need width or number`);
    return;
  }
  if (!checkResizeFit(fit)) {
    console.log(`${namespace$2} / ${methodName} / error: unsupport fit`);
    return;
  }

  // output
  const output = `${src}_resize.${ext}`;
  console.log(`${namespace$2} / ${methodName} / output:`, output);

  // options
  const options = {
    fit: fit,
  };
  if (!isNaN(widthInt)) options.width = widthInt;
  if (!isNaN(heightInt)) options.height = heightInt;

  // resize
  return await qiaoImg.resize(src, output, options);
};

// img

// namespace
const namespace$1 = 'qiao-img-cli';

/**
 * convertIt
 * @param {*} src
 * @param {*} format
 * @returns
 */
const convertIt = async (src, format) => {
  // method
  const methodName = 'convert';

  // const
  const srcs = src.split('.');
  const ext = srcs[srcs.length - 1].toLowerCase();
  const outputFormat = format.toLowerCase();
  console.log(`${namespace$1} / ${methodName} / src:`, src);
  console.log(`${namespace$1} / ${methodName} / ext:`, ext);
  console.log(`${namespace$1} / ${methodName} / format:`, outputFormat);

  // check
  if (!checkSupportFormat(ext)) {
    console.log(`${namespace$1} / ${methodName} / error: unsupport input format`);
    return;
  }
  if (!checkSupportFormat(outputFormat)) {
    console.log(`${namespace$1} / ${methodName} / error: unsupport output format`);
    return;
  }

  // output
  const output = `${src}_convert.${outputFormat}`;
  console.log(`${namespace$1} / ${methodName} / output:`, output);

  // convert
  return await qiaoImg.file(src, output);
};

// img

// namespace
const namespace = 'qiao-img-cli';

/**
 * metaIt
 * @param {*} src
 * @returns
 */
const metaIt = async (src) => {
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
  return await qiaoImg.meta(src);
};

exports.convertIt = convertIt;
exports.metaIt = metaIt;
exports.resizeIt = resizeIt;
