// handler
const handler = require('./_handler.js');

// fork handler
async function forkHandler() {
  // check
  if (!process || !process.argv) return;

  // value
  const value = parseInt(process.argv[2]);

  // msg
  const msg = await handler(value);
  process.send(msg);
}

forkHandler();
