'use strict';

var fs = require('fs');
var qiaoEncode = require('qiao-encode');
var qiaoAjax = require('qiao-ajax');
var qiao_log_js = require('qiao.log.js');

// fs
const logger = qiao_log_js.Logger('qiao-tts');

/**
 * moyinTTS
 * https://openapi.moyin.com/index
 * @param {*} options
 * @returns
 */
const moyinTTS = (options) => {
  const methodName = 'moyinTTS';

  // const
  const appKey = options.appKey;
  const appSecret = options.appSecret;
  const txt = options.txt;
  const audioPath = options.audioPath;
  logger.info(methodName, 'appKey', appKey);
  logger.info(methodName, 'appSecret', appSecret);
  logger.info(methodName, 'txt', txt);
  logger.info(methodName, 'audioPath', audioPath);

  // check
  if (!appKey) {
    logger.info(methodName, 'need appKey');
    return;
  }
  if (!appSecret) {
    logger.info(methodName, 'need appSecret');
    return;
  }
  if (!txt) {
    logger.info(methodName, 'need txt');
    return;
  }
  if (!audioPath) {
    logger.info(methodName, 'need audioPath');
    return;
  }

  // config
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = qiaoEncode.md5(`${appKey}+${appSecret}+${timestamp}`, 'hex');
  const config = {
    text: txt,
    appkey: appKey,
    signature: signature,
    timestamp: timestamp,
    speaker: options.speaker || 'cissy_meet',
    audio_type: options.audio_type || 'mp3',
    // 发音人合成的语速，支持小数点后两位
    // 默认值：1.0
    // 可选值：0.5-2.0
    speed: options.speed || 1.0,
  };
  logger.info(methodName, 'config', config);

  // req
  return new Promise((resolve, reject) => {
    qiaoAjax
      .post('https://open.mobvoi.com/api/tts/v1', {
        data: config,
        responseType: 'stream',
      })
      .then((response) => {
        // not 200
        if (response.status !== 200) return reject(`response.status not 200, is ${response.status}`);

        // request error
        if (response.headers['content-type'] === 'application/json') {
          let jsonData = '';
          response.data.on('data', (chunk) => {
            jsonData += chunk.toString();
          });
          response.data.on('end', () => {
            try {
              const data = JSON.parse(jsonData);
              return reject(`request error, code is ${data.errorMessage.code}, msg is ${data.errorMessage.desc}`);
            } catch (error) {
              return reject(error);
            }
          });
        }

        // request success
        const writer = fs.createWriteStream(audioPath);
        response.data.pipe(writer);
        writer.on('finish', resolve);
        writer.on('error', reject);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

exports.moyinTTS = moyinTTS;
