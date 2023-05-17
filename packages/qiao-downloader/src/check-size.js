// fs
import { fs } from 'qiao-file';

// debug
import Debug from 'debug';
const debug = Debug('qiao-downloader');

/**
 * checkSize
 * @param {*} res
 * @param {*} dest
 */
export const checkSize = async (res, dest) => {
  // check
  if (!res || !dest) return;

  // res length
  const resLength = res.headers['content-length'];
  if (!resLength) return;

  // fs length
  try {
    const s = await fs.stat(dest);
    if (!s || !s.size) return;

    return parseInt(resLength, 10) === s.size;
  } catch (error) {
    debug(error);
  }
};
