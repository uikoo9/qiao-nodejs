// url
import { URL } from 'url';

/**
 * check url
 * @param {*} checkUrl
 * @returns
 */
export const checkUrl = (inputUrl) => {
  // check
  if (!inputUrl) return;

  // check url
  const url = new URL(inputUrl);
  if (!url) return;

  // check protocol
  return url.protocol === 'http:' || url.protocol === 'https:';
};
