// sharp
import sharp from 'sharp';

// util
import { ensureInputOutput } from './_util.js';

// debug
import Debug from 'debug';
const debug = Debug('qiao-img');

/**
 * file
 * @param {*} input
 * @param {*} output
 * @returns
 */
export const file = async (input, output, meta) => {
  // ensure
  const ensure = await ensureInputOutput(input, output);
  if (!ensure) return;

  try {
    let res;
    if (meta) {
      meta = meta === true ? {} : meta;
      res = await sharp(input).withMetadata(meta).toFile(output);
    } else {
      res = await sharp(input).toFile(output);
    }
    console.log('qiao-img / file / success');
    debug('qiao-img / file / success:', res);
    return res;
  } catch (error) {
    console.log('qiao-img / file / error:');
    console.log(error);
  }
};

/**
 * buffer
 * @param {*} input
 * @returns
 */
export const buffer = async (input, meta) => {
  // log
  console.log('qiao-img / buffer / input:', input);

  // check
  if (!input) {
    console.log('qiao-img / buffer / fail: need input');
    return;
  }

  try {
    let res;
    if (meta) {
      meta = meta === true ? {} : meta;
      res = await sharp(input).withMetadata(meta).toBuffer({ resolveWithObject: true });
    } else {
      res = await sharp(input).toBuffer({ resolveWithObject: true });
    }
    console.log('qiao-img / buffer / success');
    debug('qiao-img / buffer / success:', res);
    return res;
  } catch (error) {
    console.log('qiao-img / buffer / error:');
    console.log(error);
  }
};
