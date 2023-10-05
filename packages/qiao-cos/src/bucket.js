/**
 * listBuckets
 * @returns
 */
export const listBuckets = (app) => {
  return new Promise((resolve, reject) => {
    // check
    if (!app || !app.client) return reject(new Error('need app, app.client'));

    // list bucket
    app.client.getService(function (err, data) {
      if (err) return reject(err);
      if (!data || data.statusCode !== 200) return reject(new Error('list buckets error'));

      resolve(data);
    });
  });
};

/**
 * listObjects
 * @param {*} app
 * @param {*} prefix
 * @returns
 */
export const listObjects = (app, prefix, max) => {
  return new Promise((resolve, reject) => {
    // check
    if (!app || !app.client || !app.config) return reject(new Error('need app, app.client, app.config'));

    // options
    const options = {
      Bucket: app.config.Bucket,
      Region: app.config.Region,
    };
    if (prefix) options.Prefix = prefix;
    if (max) options.MaxKeys = max;

    // list object
    app.client.getBucket(options, (err, data) => {
      if (err) return reject(err);
      if (!data || data.statusCode !== 200) return reject(new Error('list buckets error'));

      resolve(data);
    });
  });
};
