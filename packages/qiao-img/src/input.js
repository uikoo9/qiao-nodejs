// sharp
import sharp from 'sharp';

/**
 * meta
 * @param {*} input
 * @returns
 */
export const meta = async (input) => {
  return await sharp(input).metadata();
};

/**
 * stats
 * @param {*} input
 * @returns
 */
export const stats = async (input) => {
  return await sharp(input).stats();
};
