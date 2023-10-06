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
