// qiao
import { get, post } from 'qiao-ajax';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-talker');

/**
 * emoCheckFace
 * @param {*} options
 * @returns
 */
export const emoCheckFace = async (options) => {
  const methodName = 'emoCheckFace';

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
    const res = await post(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appKey}`,
      },
      data: {
        model: 'emo-detect-v1',
        input: {
          image_url: imageUrl,
        },
        parameters: {
          ratio: '1:1',
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

/**
 * emoStartTalker
 * @param {*} options
 * @returns
 */
export const emoStartTalker = async (options) => {
  const methodName = 'emoStartTalker';

  // const
  const appKey = options.appKey;
  const imageUrl = options.imageUrl;
  const audioUrl = options.audioUrl;
  const face_bbox = options.face_bbox;
  const ext_bbox = options.ext_bbox;
  logger.info(methodName, 'appKey', appKey);
  logger.info(methodName, 'imageUrl', imageUrl);
  logger.info(methodName, 'audioUrl', audioUrl);
  logger.info(methodName, 'face_bbox', face_bbox);
  logger.info(methodName, 'ext_bbox', ext_bbox);

  // check
  if (!appKey) {
    logger.info(methodName, 'need appKey');
    return;
  }
  if (!imageUrl) {
    logger.info(methodName, 'need imageUrl');
    return;
  }
  if (!audioUrl) {
    logger.info(methodName, 'need audioUrl');
    return;
  }

  // req
  try {
    const url = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/image2video/video-synthesis/';
    const res = await post(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appKey}`,
        'X-DashScope-Async': 'enable',
      },
      data: {
        model: 'emo-v1',
        input: {
          image_url: imageUrl,
          audio_url: audioUrl,
          face_bbox: face_bbox,
          ext_bbox: ext_bbox,
        },
        parameters: {
          // 可选择动作风格强度控制人物的运动姿态和幅度，当前支持3种：normal、calm、active，分别对应人物动作风格适中、平静、活泼。默认为normal。
          style_level: options.style_level || 'normal',
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

/**
 * emoCheckTalker
 * @param {*} options
 * @returns
 */
export const emoCheckTalker = async (options) => {
  const methodName = 'emoCheckTalker';

  // const
  const appKey = options.appKey;
  const taskId = options.taskId;
  logger.info(methodName, 'appKey', appKey);
  logger.info(methodName, 'taskId', taskId);

  // check
  if (!appKey) {
    logger.info(methodName, 'need appKey');
    return;
  }
  if (!taskId) {
    logger.info(methodName, 'need taskId');
    return;
  }

  // req
  try {
    const url = `https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`;
    const res = await get(url, {
      headers: {
        Authorization: `Bearer ${appKey}`,
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
