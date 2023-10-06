// sharp
import sharp from 'sharp';

// debug
import Debug from 'debug';
const debug = Debug('qiao-img');

/**
 * meta
 * @param {*} input
 * @returns
 */
export const meta = async (input) => {
  // log
  debug('qiao-img / meta / input:', input);

  // check
  if (!input) {
    debug('qiao-img / meta / fail: need input');
    return;
  }

  try {
    const res = await await sharp(input).metadata();
    debug('qiao-img / meta / success:', res);
    return res;
  } catch (error) {
    debug('qiao-img / meta / error:');
    debug(error);
  }
};

/**
 * stats
 * @param {*} input
 * @returns
 */
export const stats = async (input) => {
  // log
  debug('qiao-img / stats / input:', input);

  // check
  if (!input) {
    debug('qiao-img / stats / fail: need input');
    return;
  }

  try {
    const res = await await sharp(input).stats();
    debug('qiao-img / stats / success:', res);
    return res;
  } catch (error) {
    debug('qiao-img / stats / error:');
    debug(error);
  }
};
