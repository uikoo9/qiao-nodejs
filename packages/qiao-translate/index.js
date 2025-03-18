'use strict';

var openapi = require('@volcengine/openapi');
var qiaoAjax = require('qiao-ajax');
var qiao_log_js = require('qiao.log.js');

// sign
const logger = qiao_log_js.Logger('qiao-translate');

/**
 * translateTxt
 * @param {*} options
 * @param {*} src
 * @param {*} target
 * @param {*} txt
 */
const translateTxt = async (options, src, target, txt) => {
  const methodName = 'translateTxt';

  // body
  const RequestPayload = {
    SourceLanguage: src,
    TargetLanguage: target,
    TextList: txt,
  };

  // data
  const openApiRequestData = {
    region: 'cn-north-1',
    method: 'POST',
    params: {
      Action: 'TranslateText',
      Version: '2020-06-01',
    },
    headers: {},
    body: RequestPayload,
  };

  // sign
  const signer = new openapi.Signer(openApiRequestData, 'translate');
  signer.addAuthorization({
    accessKeyId: options.accessKey,
    secretKey: options.secretKey,
  });

  // go
  try {
    const url = `https://translate.volcengineapi.com?Action=TranslateText&Version=2020-06-01`;
    const res = await qiaoAjax.post(url, {
      headers: openApiRequestData.headers,
      data: RequestPayload,
    });

    // check
    if (res.status !== 200) {
      logger.error(methodName, `status is ${res.status}`);
      return;
    }

    // data
    const data = res.data;
    if (data.ResponseMetadata.error) {
      logger.error(methodName, 'translate error', data.ResponseMetadata.error);
      return;
    }

    // r
    return data.ResponseMetadata.TranslationList;
  } catch (error) {
    logger.error(methodName, 'request error', error);
  }
};

// translate

/**
 * default
 */
var index = (options) => {
  // app
  const app = {};
  app.translateTxt = async (src, target, txt) => {
    return await translateTxt(options, src, target, txt);
  };

  // return
  return app;
};

module.exports = index;
