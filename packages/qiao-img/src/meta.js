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
