// sharp
import sharp from 'sharp';

// util
import { ensureInputOutput } from './_util.js';

// debug
import Debug from 'debug';
const debug = Debug('qiao-img');

/**
 * resize
 * @param {*} input
 * @param {*} output
 * @param {*} options
 * @returns
 */
export const resize = async (input, output, options) => {
  // ensure
  const ensure = await ensureInputOutput(input, output);
  if (!ensure) return;

  try {
    const res = await await sharp(input).resize(options).toFile(output);
    console.log('qiao-img / resize / success');
    debug('qiao-img / resize / success:', res);
    return res;
  } catch (error) {
    console.log('qiao-img / resize / error:');
    console.log(error);
  }
};
