// qiao
import { uuid } from 'qiao-encode';
import { post } from 'qiao-ajax';
import { writeFile } from 'qiao-file';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-tts');

/**
 * huoshanTTS
 * https://www.volcengine.com/product/tts
 * @param {*} options
 * @returns
 */
export const huoshanTTS = async (options) => {
  const methodName = 'huoshanTTS';

  // const
  const appid = options.appid;
  const token = options.token;
  const txt = options.txt;
  const speaker = options.speaker;
  const audioPath = options.audioPath;
  logger.info(methodName, 'token', token);
  logger.info(methodName, 'txt', txt);
  logger.info(methodName, 'audioPath', audioPath);

  // check
  if (!appid) {
    logger.info(methodName, 'need appid');
    return;
  }
  if (!token) {
    logger.info(methodName, 'need token');
    return;
  }
  if (!txt) {
    logger.info(methodName, 'need txt');
    return;
  }
  if (!speaker) {
    logger.info(methodName, 'need speaker');
    return;
  }
  if (!audioPath) {
    logger.info(methodName, 'need audioPath');
    return;
  }

  // const
  const url = 'https://openspeech.bytedance.com/api/v1/tts';
  const uuidname = uuid();

  // config
  const config = {
    headers: {
      Authorization: `Bearer;${token}`,
    },
    data: {
      app: {
        appid: appid,
        token: token,
        cluster: 'volcano_tts',
      },
      user: {
        uid: 'xiaolouai',
      },
      audio: {
        voice_type: speaker,
        encoding: 'mp3',
        speed_ratio: 1,
      },
      request: {
        reqid: uuidname,
        text: txt,
        operation: 'query',
      },
    },
  };
  logger.info(methodName, 'config', config);

  // req
  const res = await post(url, config);
  if (res.status !== 200) {
    logger.error(methodName, 'status not 200', res.status);
    return;
  }
  if (res.data.code !== 3000) {
    logger.error(methodName, 'code not 3000', res.data);
    return;
  }

  // write
  const audioBuffer = Buffer.from(res.data.data, 'base64');
  const writeFileRes = await writeFile(audioPath, audioBuffer);
  if (!writeFileRes) {
    logger.error(methodName, 'write file error');
    return;
  }

  // r
  return true;
};
