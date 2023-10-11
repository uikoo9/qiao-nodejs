'use strict';

var sharp$1 = require('sharp');
var Debug = require('debug');
var qiaoFile = require('qiao-file');

// sharp
const debug$3 = Debug('qiao-img');

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
    const res = await await sharp$1(input).metadata();
    console.log('qiao-img / meta / success');
    debug$3('qiao-img / meta / success:', res);
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
    const res = await await sharp$1(input).stats();
    console.log('qiao-img / stats / success');
    debug$3('qiao-img / stats / success:', res);
    return res;
  } catch (error) {
    console.log('qiao-img / stats / error:');
    console.log(error);
  }
};

// qiao

/**
 * ensureInputOutput
 * @param {*} input
 * @param {*} output
 * @returns
 */
const ensureInputOutput = async (input, output) => {
  // log
  console.log('qiao-img / ensureInputOutput / input:', input);
  console.log('qiao-img / ensureInputOutput / output:', output);

  // check
  if (!input || !output) {
    console.log('qiao-img / ensureInputOutput / fail: need input and output');
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

  // return
  return res;
};

// sharp
const debug$2 = Debug('qiao-img');

/**
 * file
 * @param {*} input
 * @param {*} output
 * @returns
 */
const file = async (input, output, meta) => {
  // ensure
  const ensure = await ensureInputOutput(input, output);
  if (!ensure) return;

  try {
    let res;
    if (meta) {
      meta = meta === true ? {} : meta;
      res = await sharp$1(input).withMetadata(meta).toFile(output);
    } else {
      res = await sharp$1(input).toFile(output);
    }
    console.log('qiao-img / file / success');
    debug$2('qiao-img / file / success:', res);
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
      res = await sharp$1(input).withMetadata(meta).toBuffer({ resolveWithObject: true });
    } else {
      res = await sharp$1(input).toBuffer({ resolveWithObject: true });
    }
    console.log('qiao-img / buffer / success');
    debug$2('qiao-img / buffer / success:', res);
    return res;
  } catch (error) {
    console.log('qiao-img / buffer / error:');
    console.log(error);
  }
};

// sharp
const debug$1 = Debug('qiao-img');

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
  // ensure
  const ensure = await ensureInputOutput(input, output);
  if (!ensure) return;

  // log
  console.log('qiao-img / convert / meta:', meta);
  console.log('qiao-img / convert / convertType:', convertType);
  console.log('qiao-img / convert / convertOptions:', convertOptions);

  // check
  if (!convertType) {
    console.log('qiao-img / convert / fail: need convertType');
    return;
  }
  if (convertTypes.indexOf(convertType) === -1) {
    console.log('qiao-img / convert / fail: unsupport convertType');
    return;
  }

  try {
    convertOptions = convertOptions || {};
    let res;
    if (meta) {
      meta = meta === true ? {} : meta;
      res = await sharp$1(input)[convertType](convertOptions).withMetadata(meta).toFile(output);
    } else {
      res = await sharp$1(input)[convertType](convertOptions).toFile(output);
    }
    console.log('qiao-img / convert / success');
    debug$1('qiao-img / convert / success:', res);
    return res;
  } catch (error) {
    console.log('qiao-img / convert / error:');
    console.log(error);
  }
};

// sharp
const debug = Debug('qiao-img');

/**
 * resize
 * @param {*} input
 * @param {*} output
 * @param {*} options
 * @returns
 */
const resize = async (input, output, options) => {
  // ensure
  const ensure = await ensureInputOutput(input, output);
  if (!ensure) return;

  try {
    const res = await await sharp$1(input).resize(options).toFile(output);
    console.log('qiao-img / resize / success');
    debug('qiao-img / resize / success:', res);
    return res;
  } catch (error) {
    console.log('qiao-img / resize / error:');
    console.log(error);
  }
};

// sharp
const sharp = sharp$1;

exports.buffer = buffer;
exports.convert = convert;
exports.file = file;
exports.meta = meta;
exports.resize = resize;
exports.sharp = sharp;
exports.stats = stats;
