'use strict';

var sharp = require('sharp');
var Debug = require('debug');
var qiaoFile = require('qiao-file');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(
          n,
          k,
          d.get
            ? d
            : {
                enumerable: true,
                get: function () {
                  return e[k];
                },
              },
        );
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var sharp__namespace = /*#__PURE__*/ _interopNamespaceDefault(sharp);

// sharp
const debug$2 = Debug('qiao-img');

/**
 * meta
 * @param {*} input
 * @returns
 */
const meta = async (input) => {
  // log
  console.log('qiao-img / meta / input:', input);

  // check
  if (!input) {
    console.log('qiao-img / meta / fail: need input');
    return;
  }

  try {
    const res = await await sharp(input).metadata();
    console.log('qiao-img / meta / success');
    debug$2('qiao-img / meta / success:', res);
    return res;
  } catch (error) {
    console.log('qiao-img / meta / error:');
    console.log(error);
  }
};

/**
 * stats
 * @param {*} input
 * @returns
 */
const stats = async (input) => {
  // log
  console.log('qiao-img / stats / input:', input);

  // check
  if (!input) {
    console.log('qiao-img / stats / fail: need input');
    return;
  }

  try {
    const res = await await sharp(input).stats();
    console.log('qiao-img / stats / success');
    debug$2('qiao-img / stats / success:', res);
    return res;
  } catch (error) {
    console.log('qiao-img / stats / error:');
    console.log(error);
  }
};

// sharp
const debug$1 = Debug('qiao-img');

/**
 * file
 * @param {*} input
 * @param {*} output
 * @returns
 */
const file = async (input, output, meta) => {
  // log
  console.log('qiao-img / file / input:', input);
  console.log('qiao-img / file / output:', output);

  // check
  if (!input || !output) {
    console.log('qiao-img / file / fail: need input and output');
    return;
  }

  // dir
  const dirname = qiaoFile.path.dirname(output);
  const res = await qiaoFile.mkdir(dirname);
  if (res) {
    console.log('qiao-img / file / mkdir / success');
  } else {
    console.log('qiao-img / file / mkdir / fail');
  }

  try {
    let res;
    if (meta) {
      meta = meta === true ? {} : meta;
      res = await sharp(input).withMetadata(meta).toFile(output);
    } else {
      res = await sharp(input).toFile(output);
    }
    console.log('qiao-img / file / success');
    debug$1('qiao-img / file / success:', res);
    return res;
  } catch (error) {
    console.log('qiao-img / file / error:');
    console.log(error);
  }
};

/**
 * buffer
 * @param {*} input
 * @returns
 */
const buffer = async (input, meta) => {
  // log
  console.log('qiao-img / buffer / input:', input);

  // check
  if (!input) {
    console.log('qiao-img / buffer / fail: need input');
    return;
  }

  try {
    let res;
    if (meta) {
      meta = meta === true ? {} : meta;
      res = await sharp(input).withMetadata(meta).toBuffer({ resolveWithObject: true });
    } else {
      res = await sharp(input).toBuffer({ resolveWithObject: true });
    }
    console.log('qiao-img / buffer / success');
    debug$1('qiao-img / buffer / success:', res);
    return res;
  } catch (error) {
    console.log('qiao-img / buffer / error:');
    console.log(error);
  }
};

// sharp
const debug = Debug('qiao-img');

// convertTypes
const convertTypes = ['jpeg', 'png', 'webp', 'gif', 'jp2', 'tiff', 'avif', 'heif', 'jxl'];

/**
 * convert
 * @param {*} input
 * @param {*} output
 * @param {*} meta
 * @param {*} convertType
 * @param {*} convertOptions
 * @returns
 */
const convert = async (input, output, meta, convertType, convertOptions) => {
  // log
  console.log('qiao-img / convert / input:', input);
  console.log('qiao-img / convert / output:', output);
  console.log('qiao-img / convert / meta:', meta);
  console.log('qiao-img / convert / convertType:', convertType);
  console.log('qiao-img / convert / convertOptions:', convertOptions);

  // check
  if (!input) {
    console.log('qiao-img / convert / fail: need input');
    return;
  }
  if (!output) {
    console.log('qiao-img / convert / fail: need output');
    return;
  }
  if (!convertType) {
    console.log('qiao-img / convert / fail: need convertType');
    return;
  }
  if (convertTypes.indexOf(convertType) === -1) {
    console.log('qiao-img / convert / fail: unsupport convertType');
    return;
  }

  // dir
  const dirname = qiaoFile.path.dirname(output);
  const res = await qiaoFile.mkdir(dirname);
  if (res) {
    console.log('qiao-img / convert / mkdir / success');
  } else {
    console.log('qiao-img / convert / mkdir / fail');
  }

  try {
    convertOptions = convertOptions || {};
    let res;
    if (meta) {
      meta = meta === true ? {} : meta;
      res = await sharp(input)[convertType](convertOptions).withMetadata(meta).toFile(output);
    } else {
      res = await sharp(input)[convertType](convertOptions).toFile(output);
    }
    console.log('qiao-img / convert / success');
    debug('qiao-img / convert / success:', res);
    return res;
  } catch (error) {
    console.log('qiao-img / convert / error:');
    console.log(error);
  }
};

exports.sharp = sharp__namespace;
exports.buffer = buffer;
exports.convert = convert;
exports.file = file;
exports.meta = meta;
exports.stats = stats;
