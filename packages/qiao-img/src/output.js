// sharp
import sharp from 'sharp';

// qiao
import { path, mkdir } from 'qiao-file';

// debug
import Debug from 'debug';
const debug = Debug('qiao-img');

/**
 * convert
 * @param {*} input
 * @param {*} output
 * @returns
 */
export const convert = async (input, output) => {
  // log
  debug('qiao-img / convert / input:', input);
  debug('qiao-img / convert / output:', output);

  // check
  if (!input || !output) {
    debug('qiao-img / convert / fail: need input and output');
    return;
  }

  // dir
  const dirname = path.dirname(output);
  const res = await mkdir(dirname);
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

/**
 * buffer
 * @param {*} input
 * @returns
 */
export const buffer = async (input) => {
  // log
  debug('qiao-img / buffer / input:', input);

  // check
  if (!input) {
    debug('qiao-img / buffer / fail: need input');
    return;
  }

  try {
    const res = await sharp(input).toBuffer({ resolveWithObject: true });
    debug('qiao-img / buffer / success:', res);
    return res;
  } catch (error) {
    debug('qiao-img / buffer / error:');
    debug(error);
  }
};
