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
  logger.info(methodName, 'videoPath', videoPath);

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
  logger.info(methodName, 'inputVideoPath', inputVideoPath);
  logger.info(methodName, 'outputVideoPath', outputVideoPath);
  logger.info(methodName, 'startTime', startTime);
  logger.info(methodName, 'duration', duration);

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
  logger.info(methodName, 'videoFiles', videoFiles);
  logger.info(methodName, 'outputPath', outputPath);

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
  logger.info(methodName, 'inputVideoPath', inputVideoPath);
  logger.info(methodName, 'outputVideoPath', outputVideoPath);

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

exports.cutVideo = cutVideo;
exports.getVideoMeta = getVideoMeta;
exports.mergeVideos = mergeVideos;
exports.paddingVideo = paddingVideo;
