// cp
import child_process from 'child_process';

/**
 * fork
 *  js path
 *  args
 *  on msg
 *  on exit
 */
export const fork = (jsPath, args, onMsg, onExit) => {
  if (!jsPath) {
    console.log('need fork js path');
    return;
  }

  const cp = child_process.fork(jsPath, args || []);
  cp.on('message', function (msg) {
    if (onMsg) onMsg(msg);
  });
  cp.on('exit', function (code) {
    if (onExit) onExit(code);
  });

  return cp;
};

/**
 * send
 *  msg
 */
export const send = (msg) => {
  process.send(msg);
};

/**
 * on msg
 *  on msg
 */
export const onMsg = (onMsg) => {
  process.on('message', function (msg) {
    if (onMsg) onMsg(msg);
  });
};

/**
 * kill
 *  pid
 */
export const kill = (pid) => {
  process.kill(pid);
};
