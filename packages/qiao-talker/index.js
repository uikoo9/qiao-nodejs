'use strict';

var qiaoAjax = require('qiao-ajax');
var qiao_log_js = require('qiao.log.js');

// qiao
const logger$1 = qiao_log_js.Logger('qiao-talker');

/**
 * emoCheckFace
 * @param {*} options
 * @returns
 */
const emoCheckFace = async (options) => {
  const methodName = 'emoCheckFace';

  // const
  const appKey = options.appKey;
  const imageUrl = options.imageUrl;
  logger$1.info(methodName, 'appKey', appKey);
  logger$1.info(methodName, 'imageUrl', imageUrl);

  // check
  if (!appKey) {
    logger$1.info(methodName, 'need appKey');
    return;
  }
  if (!imageUrl) {
    logger$1.info(methodName, 'need imageUrl');
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
        model: 'emo-detect-v1',
        input: {
          image_url: imageUrl,
        },
      },
    });

    // check
    if (res.status !== 200) {
      logger$1.error(methodName, `status is ${res.status}`);
      return;
    }
    if (res.data && res.data.code) {
      logger$1.error(methodName, 'request failed', res.data);
      return;
    }

    // r
    return res.data;
  } catch (error) {
    logger$1.error(methodName, 'request error', error);
  }
};

/**
 * emoStartTalker
 * @param {*} options
 * @returns
 */
const emoStartTalker = async (options) => {
  const methodName = 'emoStartTalker';

  // const
  const appKey = options.appKey;
  const imageUrl = options.imageUrl;
  const audioUrl = options.audioUrl;
  const face_bbox = options.face_bbox;
  const ext_bbox = options.ext_bbox;
  logger$1.info(methodName, 'appKey', appKey);
  logger$1.info(methodName, 'imageUrl', imageUrl);
  logger$1.info(methodName, 'audioUrl', audioUrl);
  logger$1.info(methodName, 'face_bbox', face_bbox);
  logger$1.info(methodName, 'ext_bbox', ext_bbox);

  // check
  if (!appKey) {
    logger$1.info(methodName, 'need appKey');
    return;
  }
  if (!imageUrl) {
    logger$1.info(methodName, 'need imageUrl');
    return;
  }
  if (!audioUrl) {
    logger$1.info(methodName, 'need audioUrl');
    return;
  }

  // req
  try {
    const url = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/image2video/video-synthesis/';
    const res = await qiaoAjax.post(url, {
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
      logger$1.error(methodName, `status is ${res.status}`);
      return;
    }
    if (res.data && res.data.code) {
      logger$1.error(methodName, 'request failed', res.data);
      return;
    }

    // r
    return res.data;
  } catch (error) {
    logger$1.error(methodName, 'request error', error);
  }
};

/**
 * emoCheckTalker
 * @param {*} options
 * @returns
 */
const emoCheckTalker = async (options) => {
  const methodName = 'emoCheckTalker';

  // const
  const appKey = options.appKey;
  const taskId = options.taskId;
  logger$1.info(methodName, 'appKey', appKey);
  logger$1.info(methodName, 'taskId', taskId);

  // check
  if (!appKey) {
    logger$1.info(methodName, 'need appKey');
    return;
  }
  if (!taskId) {
    logger$1.info(methodName, 'need taskId');
    return;
  }

  // req
  try {
    const url = `https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`;
    const res = await qiaoAjax.get(url, {
      headers: {
        Authorization: `Bearer ${appKey}`,
      },
    });

    // check
    if (res.status !== 200) {
      logger$1.error(methodName, `status is ${res.status}`);
      return;
    }
    if (res.data && res.data.code) {
      logger$1.error(methodName, 'request failed', res.data);
      return;
    }

    // r
    return res.data;
  } catch (error) {
    logger$1.error(methodName, 'request error', error);
  }
};

// qiao
const logger = qiao_log_js.Logger('qiao-talker');

/**
 * liveCheckFace
 * @param {*} options
 * @returns
 */
const liveCheckFace = async (options) => {
  const methodName = 'liveCheckFace';

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

/**
 * liveStartTalker
 * @param {*} options
 * @returns
 */
const liveStartTalker = async (options) => {
  const methodName = 'liveStartTalker';

  // const
  const appKey = options.appKey;
  const imageUrl = options.imageUrl;
  const audioUrl = options.audioUrl;
  logger.info(methodName, 'appKey', appKey);
  logger.info(methodName, 'imageUrl', imageUrl);
  logger.info(methodName, 'audioUrl', audioUrl);

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
    const res = await qiaoAjax.post(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appKey}`,
        'X-DashScope-Async': 'enable',
      },
      data: {
        model: 'liveportrait',
        input: {
          image_url: imageUrl,
          audio_url: audioUrl,
        },
        parameters: {
          // 可按模板控制人物头部的运动姿态和幅度，当前支持3种模板：normal、calm、active。默认为normal。
          template_id: options.template_id || 'normal',

          // 每秒眨眼次数，可设值为0-1，值越大眨眼频率越高。默认值为0.5。
          eye_move_freq: options.eye_move_freq || 0.5,

          // 输出视频帧率，可设值为15-30。默认值为24。
          video_fps: options.video_fps || 24,

          // 嘴部动作的幅度大小，可设值为0-1.5，值越大嘴型越大。若设为0则嘴部无动作。默认值为1。
          mouth_move_strength: options.mouth_move_strength || 1,

          // 生成的人脸是否贴回原图，可设值为true或false。若设为false则仅输出生成的人脸，忽略人物身体。默认值为true。
          paste_back: true,

          // 头部动作幅度，可设值为0-1，值越大头部动作幅度越大。默认值为0.7。
          head_move_strength: options.head_move_strength || 0.7,
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
 * liveCheckTalker
 * @param {*} options
 * @returns
 */
const liveCheckTalker = async (options) => {
  const methodName = 'liveCheckTalker';

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
    const res = await qiaoAjax.get(url, {
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

exports.emoCheckFace = emoCheckFace;
exports.emoCheckTalker = emoCheckTalker;
exports.emoStartTalker = emoStartTalker;
exports.liveCheckFace = liveCheckFace;
exports.liveCheckTalker = liveCheckTalker;
exports.liveStartTalker = liveStartTalker;
