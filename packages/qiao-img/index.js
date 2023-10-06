'use strict';

var sharp = require('sharp');
var Debug = require('debug');
var qiaoFile = require('qiao-file');

// sharp
const debug$1 = Debug('qiao-img');

/**
 * meta
 * @param {*} input
 * @returns
 */
const meta = async (input) => {
  // log
  debug$1('qiao-img / meta / input:', input);

  // check
  if (!input) {
    debug$1('qiao-img / meta / fail: need input');
    return;
  }

  try {
    const res = await await sharp(input).metadata();
    debug$1('qiao-img / meta / success:', res);
    return res;
  } catch (error) {
    debug$1('qiao-img / meta / error:');
    debug$1(error);
  }
};

/**
 * stats
 * @param {*} input
 * @returns
 */
const stats = async (input) => {
  // log
  debug$1('qiao-img / stats / input:', input);

  // check
  if (!input) {
    debug$1('qiao-img / stats / fail: need input');
    return;
  }

  try {
    const res = await await sharp(input).stats();
    debug$1('qiao-img / stats / success:', res);
    return res;
  } catch (error) {
    debug$1('qiao-img / stats / error:');
    debug$1(error);
  }
};

// sharp
const debug = Debug('qiao-img');

/**
 * file
 * @param {*} input
 * @param {*} output
 * @returns
 */
const file = async (input, output, meta) => {
  // log
  debug('qiao-img / file / input:', input);
  debug('qiao-img / file / output:', output);

  // check
  if (!input || !output) {
    debug('qiao-img / file / fail: need input and output');
    return;
  }

  // dir
  const dirname = qiaoFile.path.dirname(output);
  const res = await qiaoFile.mkdir(dirname);
  if (res) {
    debug('qiao-img / file / mkdir / success');
  } else {
    debug('qiao-img / file / mkdir / fail');
  }

  try {
    let res;
    if (meta) {
      meta = meta === true ? {} : meta;
      res = await sharp(input).withMetadata(meta).toFile(output);
    } else {
      res = await sharp(input).toFile(output);
    }
    debug('qiao-img / file / success:', res);
    return res;
  } catch (error) {
    debug('qiao-img / file / error:');
    debug(error);
  }
};

/**
 * buffer
 * @param {*} input
 * @returns
 */
const buffer = async (input, meta) => {
  // log
  debug('qiao-img / buffer / input:', input);

  // check
  if (!input) {
    debug('qiao-img / buffer / fail: need input');
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
    debug('qiao-img / buffer / success:', res);
    return res;
  } catch (error) {
    debug('qiao-img / buffer / error:');
    debug(error);
  }
};

exports.buffer = buffer;
exports.file = file;
exports.meta = meta;
exports.stats = stats;
