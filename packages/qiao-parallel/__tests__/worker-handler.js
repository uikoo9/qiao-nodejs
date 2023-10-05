// worker
const { parentPort, workerData } = require('node:worker_threads');

// handler
const handler = require('./_handler.js');

// fork handler
async function forkHandler() {
  // msg
  var msg = await handler(workerData);
  parentPort.postMessage(msg);
}

forkHandler();
