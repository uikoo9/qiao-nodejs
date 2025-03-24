// cos
import COS from 'cos-nodejs-sdk-v5';

/**
 * reviewTxt
 * @param {*} app
 * @param {*} txt
 * @returns
 */
export const reviewTxt = (app, txt) => {
  return new Promise((resolve, reject) => {
    // check
    if (!app || !app.client) return reject(new Error('need app, app.client'));
    if (!txt) return reject(new Error('need txt'));

    // url
    const host = app.config.Bucket + '.ci.' + app.config.Region + '.myqcloud.com';
    const url = 'https://' + host + '/text/auditing';

    // body
    const txtBase64 = Buffer.from(txt).toString('base64');
    const body = COS.util.json2xml({
      Request: {
        Input: {
          Content: txtBase64,
        },
        Conf: {
          BizType: '',
        },
      },
    });

    // review txt
    app.client.request(
      {
        Bucket: app.config.Bucket,
        Region: app.config.Region,
        Method: 'POST',
        Url: url,
        Key: '/text/auditing', // * 固定值，必须
        ContentType: 'application/xml', // * 固定值，必须
        Body: body,
      },
      function (err, data) {
        if (err) return reject(err);
        if (!data || data.statusCode !== 200) return reject(new Error('review txt error'));

        resolve(data);
      },
    );
  });
};
