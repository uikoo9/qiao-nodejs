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

exports.meta = meta;
