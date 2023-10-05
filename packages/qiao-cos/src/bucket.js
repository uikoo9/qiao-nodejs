/**
 * listBuckets
 * @returns
 */
export const listBuckets = (app) => {
  return new Promise((resolve, reject) => {
    // check
    if (!app || !app.client) return reject(new Error('need app, app.client'));

    // upload
    app.client.getService(function (err, data) {
      if (err) return reject(err);
      if (!data || data.statusCode !== 200) return reject(new Error('list buckets error'));

      resolve(data);
    });
  });
};
