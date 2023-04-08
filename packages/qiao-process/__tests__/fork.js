// path
const path = require('path');

// q
const { fork, kill } = require('../index.js');

// test
function test() {
  const jsPath = path.resolve(__dirname, './cp.js');
  const args = ['haha'];

  const cp = fork(
    jsPath,
    args,
    function (msg) {
      console.log(`from child process: ${msg}`);
    },
    function (code) {
      console.log(`exit code: ${code}`);
    },
  );

  cp.send('hello child process');

  // kill cp
  setTimeout(function () {
    kill(cp.pid);
  }, 3000);
}

test();
