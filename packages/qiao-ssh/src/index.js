// ssh
import { Client } from 'ssh2';
const conn = new Client();

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
  logger.info(methodName, 'options', options);
  logger.info(methodName, 'options', cmd);

  return new Promise((resolve, reject) => {
    conn.on('ready', () => {
      logger.info(methodName, 'ssh ready');

      conn.exec(cmd, (err, stream) => {
        if (err) {
          logger.error(methodName, 'ssh err', err);
          reject(err);
          return;
        }

        stream
          .on('close', (code, signal) => {
            logger.info(methodName, 'ssh close', code, signal);
            conn.end();
          })
          .on('data', (data) => {
            resolve(data);
          })
          .stderr.on('data', (data) => {
            resolve(data);
          });
      });
    });

    conn.connect(options);
  });
};
