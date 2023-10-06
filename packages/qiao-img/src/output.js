// sharp
import sharp from 'sharp';

// qiao
import { path, mkdir } from 'qiao-file';

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
  // log
  debug('qiao-img / file / input:', input);
  debug('qiao-img / file / output:', output);

  // check
  if (!input || !output) {
    debug('qiao-img / file / fail: need input and output');
    return;
  }

  // dir
  const dirname = path.dirname(output);
  const res = await mkdir(dirname);
  if (res) {
    debug('qiao-img / file / mkdir / success');
  } else {
    debug('qiao-img / file / mkdir / fail');
  }

  try {
    let res;
    if (meta) {
      meta = meta === true ? {} : meta;
      res = await sharp(input).withMetadata(meta).toFile(output);
    } else {
      res = await sharp(input).toFile(output);
    }
    debug('qiao-img / file / success:', res);
    return res;
  } catch (error) {
    debug('qiao-img / file / error:');
    debug(error);
  }
};

/**
 * buffer
 * @param {*} input
 * @returns
 */
export const buffer = async (input, meta) => {
  // log
  debug('qiao-img / buffer / input:', input);

  // check
  if (!input) {
    debug('qiao-img / buffer / fail: need input');
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
    debug('qiao-img / buffer / success:', res);
    return res;
  } catch (error) {
    debug('qiao-img / buffer / error:');
    debug(error);
  }
};
