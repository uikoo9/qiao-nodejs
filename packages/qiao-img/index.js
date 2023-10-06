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
 * convert
 * @param {*} input
 * @param {*} output
 * @returns
 */
const convert = async (input, output) => {
  // log
  debug('qiao-img / convert / input:', input);
  debug('qiao-img / convert / output:', output);

  // check
  if (!input || !output) {
    debug('qiao-img / convert / fail: need input and output');
    return;
  }

  // dir
  const dirname = qiaoFile.path.dirname(output);
  const res = await qiaoFile.mkdir(dirname);
  if (res) {
    debug('qiao-img / convert / mkdir / success');
  } else {
    debug('qiao-img / convert / mkdir / fail');
  }

  try {
    const res = await sharp(input).toFile(output);
    debug('qiao-img / convert / success:', res);
    return res;
  } catch (error) {
    debug('qiao-img / convert / error:');
    debug(error);
  }
};

exports.convert = convert;
exports.meta = meta;
exports.stats = stats;
