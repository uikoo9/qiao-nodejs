'use strict';

var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
var qiao_log_js = require('qiao.log.js');

// fs
const logger = qiao_log_js.Logger('qiao-ffmpeg');

/**
 * getVideoMeta
 * @param {*} videoPath
 * @returns
 */
const getVideoMeta = (videoPath) => {
  const methodName = 'getVideoMeta';

  // check
  if (!videoPath) {
    logger.info(methodName, 'videoPath', videoPath);
    return;
  }

  // cmd
  const command = ffmpeg(videoPath);

  // r
  return new Promise((resolve, reject) => {
    command.ffprobe(0, (err, metadata) => {
      return err ? reject(err) : resolve(metadata);
    });
  });
};

/**
 * cutVideo
 * @param {*} inputVideoPath
 * @param {*} outputVideoPath
 * @param {*} startTime
 * @param {*} duration
 * @returns
 */
const cutVideo = (inputVideoPath, outputVideoPath, startTime, duration) => {
  const methodName = 'cutVideo';

  // check
  if (!inputVideoPath) {
    logger.info(methodName, 'inputVideoPath', inputVideoPath);
    return;
  }
  if (!outputVideoPath) {
    logger.info(methodName, 'outputVideoPath', outputVideoPath);
    return;
  }
  if (!startTime) {
    logger.info(methodName, 'startTime', startTime);
    return;
  }
  if (!duration) {
    logger.info(methodName, 'duration', duration);
    return;
  }

  // command
  const command = ffmpeg(inputVideoPath);

  // r
  return new Promise((resolve, reject) => {
    command.setStartTime(startTime).setDuration(duration);
    command
      .output(outputVideoPath)
      .on('end', function () {
        logger.info(methodName, 'end');
        resolve();
      })
      .on('error', function (err) {
        logger.error(methodName, 'error', err);
        reject(err);
      });

    // run
    command.run();
  });
};

/**
 * mergeVideos
 * @param {*} videoFiles
 * @param {*} outputPath
 * @returns
 */
const mergeVideos = (videoFiles, outputPath) => {
  const methodName = 'mergeVideos';

  // check
  if (!videoFiles) {
    logger.info(methodName, 'videoFiles', videoFiles);
    return;
  }
  if (!outputPath) {
    logger.info(methodName, 'outputPath', outputPath);
    return;
  }

  // file path
  const fileListPath = 'fileList.txt';
  const fileListContent = videoFiles.map((file) => `file '${file}'`).join('\n');
  fs.writeFileSync(fileListPath, fileListContent);

  // r
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(fileListPath)
      .inputOptions(['-f', 'concat', '-safe', '0'])
      .output(outputPath)
      .on('start', () => {
        logger.info(methodName, 'start');
      })
      .on('error', (err) => {
        logger.error(methodName, 'error', err);
        reject(err);
      })
      .on('end', () => {
        logger.info(methodName, 'end');
        resolve();
      })
      .run();
  });
};

/**
 * paddingVideo
 * @param {*} inputVideoPath
 * @param {*} outputVideoPath
 * @returns
 */
const paddingVideo = (inputVideoPath, outputVideoPath) => {
  const methodName = 'paddingVideo';

  // check
  if (!inputVideoPath) {
    logger.info(methodName, 'inputVideoPath', inputVideoPath);
    return;
  }
  if (!outputVideoPath) {
    logger.info(methodName, 'outputVideoPath', outputVideoPath);
    return;
  }

  return new Promise((resolve, reject) => {
    ffmpeg(inputVideoPath)
      .outputOptions(['-vf', `pad=540:960:(ow-iw)/2:(oh-ih)/2:black`])
      .output(outputVideoPath)
      .on('start', () => {
        logger.info(methodName, 'start');
      })
      .on('error', (err) => {
        logger.error(methodName, 'error', err);
        reject(err);
      })
      .on('end', () => {
        logger.info(methodName, 'end');
        resolve();
      })
      .run();
  });
};

/**
 * textVideo
 * @param {*} inputVideoPath
 * @param {*} outputVideoPath
 * @param {*} options
 * @returns
 */
const textVideo = (inputVideoPath, outputVideoPath, options) => {
  const methodName = 'textVideo';

  // check
  if (!inputVideoPath) {
    logger.info(methodName, 'inputVideoPath', inputVideoPath);
    return;
  }
  if (!outputVideoPath) {
    logger.info(methodName, 'outputVideoPath', outputVideoPath);
    return;
  }
  if (!options) {
    logger.info(methodName, 'options', options);
    return;
  }
  if (!options.txt) {
    logger.info(methodName, 'options.txt', options.txt);
    return;
  }

  // final options
  const finalOptions = {
    x: options.x || 150,
    y: options.y || 900,
    text: options.txt,
    fontsize: options.fontsize || 26,
    fontcolor: options.fontcolor || 'white',
  };
  if (options.fontfile) finalOptions.fontfile = options.fontfile;

  // r
  return new Promise((resolve, reject) => {
    ffmpeg(inputVideoPath)
      .videoFilters([
        {
          filter: 'drawtext',
          options: finalOptions,
        },
      ])
      .output(outputVideoPath)
      .on('start', () => {
        console.log('start text');
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        resolve();
      })
      .run();
  });
};

exports.cutVideo = cutVideo;
exports.getVideoMeta = getVideoMeta;
exports.mergeVideos = mergeVideos;
exports.paddingVideo = paddingVideo;
exports.textVideo = textVideo;
