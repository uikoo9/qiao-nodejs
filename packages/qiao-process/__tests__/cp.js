// qiao
const { onMsg, send } = require('../index.js');

onMsg(function (msg) {
  console.log(`from main process: ${msg}`);
});

send('hello main process');
