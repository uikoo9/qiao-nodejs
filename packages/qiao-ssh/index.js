'use strict';

var ssh2 = require('ssh2');
var qiao_log_js = require('qiao.log.js');

// ssh
const logger = qiao_log_js.Logger('qiao-ssh');

/**
 * sshCMD
 * @param {*} options
 * @param {*} cmd
 * @returns
 */
const sshCMD = (options, cmd) => {
  const methodName = 'sshCMD';

  const conn = new ssh2.Client();
  logger.info(methodName, 'options', options);
  logger.info(methodName, 'cmd', cmd);

  return new Promise((resolve, reject) => {
    conn.on('ready', () => {
      logger.info(methodName, 'ssh ready');

      conn.exec(cmd, (err, stream) => {
        if (err) {
          logger.error(methodName, 'ssh err', err);
          reject(err);
          return;
        }

        let res;
        stream
          .on('close', (code, signal) => {
            logger.info(methodName, 'ssh close', code, signal);
            conn.end();
            resolve(res);
          })
          .on('data', (data) => {
            res = data.toString();
          })
          .stderr.on('data', (data) => {
            res = data.toString();
          });
      });
    });

    conn.connect(options);
  });
};

exports.sshCMD = sshCMD;
