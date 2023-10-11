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
const namespace = 'qiao-img-cli';

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
  console.log(`${namespace} / ${methodName} / src:`, src);
  console.log(`${namespace} / ${methodName} / width:`, width);
  console.log(`${namespace} / ${methodName} / height:`, height);
  console.log(`${namespace} / ${methodName} / fit:`, fit);

  // const
  const srcs = src.split('.');
  const ext = srcs[srcs.length - 1].toLowerCase();
  const widthInt = parseInt(width);
  const heightInt = parseInt(height);
  console.log(`${namespace} / ${methodName} / ext:`, ext);

  // check
  if (!checkSupportFormat(ext)) {
    console.log(`${namespace} / ${methodName} / error: unsupport format`);
    return;
  }
  if (isNaN(widthInt) && isNaN(heightInt)) {
    console.log(`${namespace} / ${methodName} / error: need width or number`);
    return;
  }
  if (!checkResizeFit(fit)) {
    console.log(`${namespace} / ${methodName} / error: unsupport fit`);
    return;
  }

  // output
  const output = `${src}_resize.${ext}`;
  console.log(`${namespace} / ${methodName} / output:`, output);

  // options
  const options = {
    fit: fit,
  };
  if (!isNaN(widthInt)) options.width = widthInt;
  if (!isNaN(heightInt)) options.height = heightInt;

  // resize
  return await qiaoImg.resize(src, output, options);
};

exports.resizeIt = resizeIt;
