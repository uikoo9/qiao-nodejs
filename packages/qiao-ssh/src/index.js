// ssh
import { Client } from 'ssh2';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-ssh');

/**
 * sshCMD
 * @param {*} options
 * @param {*} cmd
 * @returns
 */
export const sshCMD = (options, cmd) => {
  const methodName = 'sshCMD';

  const conn = new Client();
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
