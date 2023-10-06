// sharp
import sharp from 'sharp';

// qiao
import { path, mkdir } from 'qiao-file';

// debug
import Debug from 'debug';
const debug = Debug('qiao-img');

// convertTypes
const convertTypes = ['jpeg', 'png', 'webp', 'gif', 'jp2', 'tiff', 'avif', 'heif', 'jxl'];

/**
 * convert
 * @param {*} input
 * @param {*} output
 * @param {*} meta
 * @param {*} convertType
 * @param {*} convertOptions
 * @returns
 */
export const convert = async (input, output, meta, convertType, convertOptions) => {
  // log
  console.log('qiao-img / convert / input:', input);
  console.log('qiao-img / convert / output:', output);
  console.log('qiao-img / convert / meta:', meta);
  console.log('qiao-img / convert / convertType:', convertType);
  console.log('qiao-img / convert / convertOptions:', convertOptions);

  // check
  if (!input) {
    console.log('qiao-img / convert / fail: need input');
    return;
  }
  if (!output) {
    console.log('qiao-img / convert / fail: need output');
    return;
  }
  if (!convertType) {
    console.log('qiao-img / convert / fail: need convertType');
    return;
  }
  if (convertTypes.indexOf(convertType) === -1) {
    console.log('qiao-img / convert / fail: unsupport convertType');
    return;
  }

  // dir
  const dirname = path.dirname(output);
  const res = await mkdir(dirname);
  if (res) {
    console.log('qiao-img / convert / mkdir / success');
  } else {
    console.log('qiao-img / convert / mkdir / fail');
  }

  try {
    convertOptions = convertOptions || {};
    let res;
    if (meta) {
      meta = meta === true ? {} : meta;
      res = await sharp(input)[convertType](convertOptions).withMetadata(meta).toFile(output);
    } else {
      res = await sharp(input)[convertType](convertOptions).toFile(output);
    }
    console.log('qiao-img / convert / success');
    debug('qiao-img / convert / success:', res);
    return res;
  } catch (error) {
    console.log('qiao-img / convert / error:');
    console.log(error);
  }
};
