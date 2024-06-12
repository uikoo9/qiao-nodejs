// sts
import STS from 'qcloud-cos-sts';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-cos');

/**
 * getCredential
 * @param {*} durationSeconds
 * @param {*} allowPrefix
 * @param {*} config
 */
export const getCredential = (durationSeconds, allowPrefix, config) => {
  const methodName = 'getCredential';
  logger.info(methodName, 'durationSeconds', durationSeconds);
  logger.info(methodName, 'allowPrefix', allowPrefix);
  logger.info(methodName, 'config', config);

  // options
  const options = {
    secretId: config.SecretId,
    secretKey: config.SecretKey,
    bucket: config.Bucket,
    region: config.Region,
    durationSeconds: durationSeconds || 1800,
    allowPrefix: allowPrefix || '',
  };
  const appId = options.bucket.substr(1 + options.bucket.lastIndexOf('-'));
  logger.info(methodName, 'options', options);
  logger.info(methodName, 'appId', appId);

  // policy
  const policy = {
    version: '2.0',
    statement: [
      {
        action: [
          // https://cloud.tencent.com/document/product/436/31923
          'name/cos:PutObject',
          'name/cos:PostObject',
          'name/cos:InitiateMultipartUpload',
          'name/cos:ListMultipartUploads',
          'name/cos:ListParts',
          'name/cos:UploadPart',
          'name/cos:CompleteMultipartUpload',
        ],
        effect: 'allow',
        principal: { qcs: ['*'] },
        resource: ['qcs::cos:' + options.region + ':uid/' + appId + ':' + options.bucket + '/' + options.allowPrefix],
      },
    ],
  };
  logger.info(methodName, 'policy', policy);

  // getCredential
  return new Promise((resolve, reject) => {
    STS.getCredential(
      {
        secretId: options.secretId,
        secretKey: options.secretKey,
        durationSeconds: options.durationSeconds,
        region: options.region,
        policy: policy,
      },
      function (err, credential) {
        return err ? reject(err) : resolve(credential);
      },
    );
  });
};
