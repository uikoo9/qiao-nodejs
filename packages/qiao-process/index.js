'use strict';

var child_process = require('child_process');

// cp

/**
 * fork
 *  js path
 *  args
 *  on msg
 *  on exit
 */
const fork = (jsPath, args, onMsg, onExit) => {
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
const send = (msg) => {
  process.send(msg);
};

/**
 * on msg
 *  on msg
 */
const onMsg = (onMsg) => {
  process.on('message', function (msg) {
    if (onMsg) onMsg(msg);
  });
};

/**
 * kill
 *  pid
 */
const kill = (pid) => {
  process.kill(pid);
};

exports.fork = fork;
exports.kill = kill;
exports.onMsg = onMsg;
exports.send = send;
