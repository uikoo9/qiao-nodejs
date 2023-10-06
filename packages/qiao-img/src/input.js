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
  console.log('qiao-img / meta / input:', input);

  // check
  if (!input) {
    console.log('qiao-img / meta / fail: need input');
    return;
  }

  try {
    const res = await await sharp(input).metadata();
    console.log('qiao-img / meta / success');
    debug('qiao-img / meta / success:', res);
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
export const stats = async (input) => {
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
    debug('qiao-img / stats / success:', res);
    return res;
  } catch (error) {
    console.log('qiao-img / stats / error:');
    console.log(error);
  }
};
