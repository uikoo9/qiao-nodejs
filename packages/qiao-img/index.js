'use strict';

var sharp = require('sharp');

// sharp

/**
 * meta
 * @param {*} input
 * @returns
 */
const meta = async (input) => {
  return await sharp(input).metadata();
};

/**
 * stats
 * @param {*} input
 * @returns
 */
const stats = async (input) => {
  return await sharp(input).stats();
};

exports.meta = meta;
exports.stats = stats;
