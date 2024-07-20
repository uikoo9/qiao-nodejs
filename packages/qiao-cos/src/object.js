/**
 * delObject
 * @returns
 */
export const delObject = (app, key) => {
  return new Promise((resolve, reject) => {
    // check
    if (!app || !app.client) return reject(new Error('need app, app.client'));

    // del object
    app.client.deleteObject(
      {
        Bucket: app.config.Bucket,
        Region: app.config.Region,
        Key: key,
      },
      function (err, data) {
        if (err) return reject(err);
        if (!data || data.statusCode !== 204) return reject(new Error('del object error'));

        resolve(data);
      },
    );
  });
};
