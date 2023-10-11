// resize fit
const resizeFit = ['cover', 'contain', 'fill', 'inside', 'outside'];

// support format
const supportFormat = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

/**
 * checkResizeFit
 * @param {*} fit
 * @returns
 */
export const checkResizeFit = (fit) => {
  return resizeFit.indexOf(fit) > -1;
};

/**
 * checkSupportFormat
 * @param {*} fotmat
 * @returns
 */
export const checkSupportFormat = (fotmat) => {
  return supportFormat.indexOf(fotmat) > -1;
};
