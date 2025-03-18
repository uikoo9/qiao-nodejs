// sign
import { Signer } from '@volcengine/openapi';

// qiao
import { post } from 'qiao-ajax';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-translate');

/**
 * translateTxt
 * @param {*} options
 * @param {*} src
 * @param {*} target
 * @param {*} txt
 */
export const translateTxt = async (options, src, target, txt) => {
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
  const signer = new Signer(openApiRequestData, 'translate');
  signer.addAuthorization({
    accessKeyId: options.accessKey,
    secretKey: options.secretKey,
  });

  // go
  try {
    const url = `https://translate.volcengineapi.com?Action=TranslateText&Version=2020-06-01`;
    const res = await post(url, {
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
