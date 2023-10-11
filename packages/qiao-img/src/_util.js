// qiao
import { path, mkdir } from 'qiao-file';

/**
 * ensureInputOutput
 * @param {*} input
 * @param {*} output
 * @returns
 */
export const ensureInputOutput = async (input, output) => {
  // log
  console.log('qiao-img / ensureInputOutput / input:', input);
  console.log('qiao-img / ensureInputOutput / output:', output);

  // check
  if (!input || !output) {
    console.log('qiao-img / ensureInputOutput / fail: need input and output');
    return;
  }

  // dir
  const dirname = path.dirname(output);
  const res = await mkdir(dirname);
  if (res) {
    console.log('qiao-img / file / mkdir / success');
  } else {
    console.log('qiao-img / file / mkdir / fail');
  }

  // return
  return res;
};
