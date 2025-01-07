'use strict';

var qiaoAjax = require('qiao-ajax');
var qiao_log_js = require('qiao.log.js');

// qiao
const logger = qiao_log_js.Logger('qiao-talker');

/**
 * checkFace
 * @param {*} options
 * @returns
 */
const checkFace = async (options) => {
  const methodName = 'checkFace';

  // const
  const appKey = options.appKey;
  const imageUrl = options.imageUrl;
  logger.info(methodName, 'appKey', appKey);
  logger.info(methodName, 'imageUrl', imageUrl);

  // check
  if (!appKey) {
    logger.info(methodName, 'need appKey');
    return;
  }
  if (!imageUrl) {
    logger.info(methodName, 'need imageUrl');
    return;
  }

  // req
  try {
    const url = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/image2video/face-detect';
    const res = await qiaoAjax.post(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appKey}`,
      },
      data: {
        model: 'liveportrait-detect',
        input: {
          image_url: imageUrl,
        },
      },
    });

    // check
    if (res.status !== 200) {
      logger.error(methodName, `status is ${res.status}`);
      return;
    }
    if (res.data && res.data.code) {
      logger.error(methodName, 'request failed', res.data);
      return;
    }

    // r
    return res.data;
  } catch (error) {
    logger.error(methodName, 'request error', error);
  }
};

exports.checkFace = checkFace;
