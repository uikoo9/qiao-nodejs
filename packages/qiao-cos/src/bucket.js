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
 * @param {*} max
 * @param {*} marker
 * @returns
 */
export const listObjects = (app, prefix, max, marker) => {
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
    if (marker) options.Marker = marker;

    // list object
    app.client.getBucket(options, (err, data) => {
      if (err) return reject(err);
      if (!data || data.statusCode !== 200) return reject(new Error('list buckets error'));

      resolve(data);
    });
  });
};

/**
 * listObjectsAll
 * @param {*} app
 * @param {*} prefix
 * @param {*} max
 * @param {*} marker
 * @returns
 */
export const listObjectsAll = async (app, prefix, max) => {
  const list = [];

  await getObjects(list, app, prefix, max);
  return list;
};

// get objects
async function getObjects(list, app, prefix, max, marker) {
  try {
    // get
    const res = await listObjects(app, prefix, max, marker);
    console.log('qiao-cos / getObjects / IsTruncated', res.IsTruncated);
    console.log('qiao-cos / getObjects / NextMarker', res.NextMarker);
    console.log('qiao-cos / getObjects / Contents', res.Contents.length);
    list.push(...res.Contents);

    // go
    if (res.IsTruncated === 'true') await getObjects(list, app, prefix, max, res.NextMarker);
  } catch (error) {
    console.log(error);
  }
}
