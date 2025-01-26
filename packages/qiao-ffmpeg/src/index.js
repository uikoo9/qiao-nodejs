// fs
import { writeFile } from 'qiao-file';

// ffmpeg
import ffmpeg from 'fluent-ffmpeg';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-ffmpeg');

/**
 * getVideoMeta
 * @param {*} videoPath
 * @returns
 */
export const getVideoMeta = (videoPath) => {
  const methodName = 'getVideoMeta';

  // check
  if (!videoPath) {
    logger.error(methodName, 'videoPath', videoPath);
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
export const cutVideo = (inputVideoPath, outputVideoPath, startTime, duration) => {
  const methodName = 'cutVideo';

  // check
  if (!inputVideoPath) {
    logger.error(methodName, 'inputVideoPath', inputVideoPath);
    return;
  }
  if (!outputVideoPath) {
    logger.error(methodName, 'outputVideoPath', outputVideoPath);
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
        resolve(true);
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
 * @param {*} fileListPath
 * @param {*} outputPath
 * @returns
 */
export const mergeVideos = async (videoFiles, fileListPath, outputPath) => {
  const methodName = 'mergeVideos';

  // check
  if (!videoFiles) {
    logger.error(methodName, 'videoFiles', videoFiles);
    return;
  }
  if (!fileListPath) {
    logger.error(methodName, 'fileListPath', fileListPath);
    return;
  }
  if (!outputPath) {
    logger.error(methodName, 'outputPath', outputPath);
    return;
  }

  // file path
  const fileListContent = videoFiles.map((file) => `file '${file}'`).join('\n');
  const writeFileRes = await writeFile(fileListPath, fileListContent);
  if (!writeFileRes) {
    logger.error(methodName, 'writeFileRes', writeFileRes);
    return;
  }

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
        resolve(true);
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
export const paddingVideo = (inputVideoPath, outputVideoPath) => {
  const methodName = 'paddingVideo';

  // check
  if (!inputVideoPath) {
    logger.error(methodName, 'inputVideoPath', inputVideoPath);
    return;
  }
  if (!outputVideoPath) {
    logger.error(methodName, 'outputVideoPath', outputVideoPath);
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
        resolve(true);
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
export const textVideo = (inputVideoPath, outputVideoPath, options) => {
  const methodName = 'textVideo';

  // check
  if (!inputVideoPath) {
    logger.error(methodName, 'inputVideoPath', inputVideoPath);
    return;
  }
  if (!outputVideoPath) {
    logger.error(methodName, 'outputVideoPath', outputVideoPath);
    return;
  }
  if (!options) {
    logger.error(methodName, 'options', options);
    return;
  }
  if (!options.txt) {
    logger.error(methodName, 'options.txt', options.txt);
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
        logger.info(methodName, 'start');
      })
      .on('error', (err) => {
        logger.error(methodName, 'error', err);
        reject(err);
      })
      .on('end', () => {
        logger.info(methodName, 'end');
        resolve(true);
      })
      .run();
  });
};

/**
 * videoAudio
 * @param {*} inputVideoPath
 * @param {*} outputVideoPath
 * @param {*} audioRate
 * @returns
 */
export const videoAudio = (inputVideoPath, outputVideoPath, audioRate) => {
  const methodName = 'videoAudio';

  // check
  if (!inputVideoPath) {
    logger.error(methodName, 'inputVideoPath', inputVideoPath);
    return;
  }
  if (!outputVideoPath) {
    logger.error(methodName, 'outputVideoPath', outputVideoPath);
    return;
  }
  if (!audioRate) {
    logger.error(methodName, 'audioRate', audioRate);
    return;
  }

  return new Promise((resolve, reject) => {
    ffmpeg(inputVideoPath)
      .outputOptions(['-af', `volume=${audioRate}`])
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
        resolve(true);
      })
      .run();
  });
};

/**
 * videoImage
 * @param {*} imagePath
 * @param {*} videoDuration
 * @param {*} outputVideoPath
 * @returns
 */
export const videoImage = (imagePath, videoDuration, outputVideoPath) => {
  const methodName = 'videoImage';

  // check
  if (!imagePath) {
    logger.error(methodName, 'imagePath', imagePath);
    return;
  }
  if (!videoDuration) {
    logger.error(methodName, 'videoDuration', videoDuration);
    return;
  }
  if (!outputVideoPath) {
    logger.error(methodName, 'outputVideoPath', outputVideoPath);
    return;
  }

  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(imagePath)
      .inputOptions([`-loop 1`])
      .outputOptions([`-t ${videoDuration}`])
      .outputOptions(['-c:v libx264', '-pix_fmt yuv420p', '-vf fps=25'])
      .save(outputVideoPath)
      .on('start', () => {
        logger.info(methodName, 'start');
      })
      .on('error', (err) => {
        logger.error(methodName, 'error', err);
        reject(err);
      })
      .on('end', () => {
        logger.info(methodName, 'end');
        resolve(true);
      })
      .run();
  });
};
