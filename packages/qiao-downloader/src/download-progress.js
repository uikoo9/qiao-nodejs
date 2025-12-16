/**
 * on progress
 * @param {*} res
 * @param {*} onProgress
 * @returns
 */
export const onDownloadProgress = (res, onProgress) => {
  // check res
  if (!res) return;

  // check progress
  if (!onProgress) return;

  // check content
  const contentLength = res.headers['content-length'];
  if (!contentLength) return;

  // total
  const total = parseInt(contentLength, 10);

  // data - 每次下载独立的计数器
  let data = 0;

  // on data
  res.on('data', (chunk) => {
    data = data + chunk.length;

    const p = (data / total).toFixed(3);
    const n = parseFloat(p);
    onProgress(n);
  });
};
