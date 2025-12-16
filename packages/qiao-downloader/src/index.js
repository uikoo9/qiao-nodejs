// check
import { checkUrl } from './check-url.js';
import { checkDest } from './check-dest.js';

// download
import { get } from './download-get.js';
import { onDownloadProgress } from './download-progress.js';
import { downloadGo } from './download-go.js';

// util
import { rejectError } from './util.js';

/**
 * download
 * @param {*} url
 * @param {*} dest
 * @param {*} options
 * @returns
 */
export const download = async (url, dest, options) => {
  // check url
  if (!checkUrl(url)) return rejectError('url is not valid');

  // check dest
  const newDest = await checkDest(dest);
  if (!newDest) return rejectError('dest is not valid');

  // options
  const { timeout, onProgress, maxRedirects } = options || {};

  // get
  let res;
  try {
    res = await get(url, maxRedirects);

    // on progress
    onDownloadProgress(res, onProgress);
  } catch (error) {
    return rejectError(error);
  }

  // file
  return downloadGo(res, newDest, timeout);
};
