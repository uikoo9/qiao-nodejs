// ava
const test = require('ava');

// download
const { download } = require('./index.js');

// before
let config = {
  url: 'https://static-small.vincentqiao.com/face1.wav',
};
test.before(async (t) => {
  try {
    config = require('./config.json');
    t.log('use config.json url');
  } catch (error) {
    t.log('use default download url');
  }
});

// undefined url
test('url / undefined url', async (t) => {
  try {
    await download();
  } catch (error) {
    if (error && error.message === 'url is not valid') {
      t.pass();
      return;
    }

    t.log(error);
    t.fail();
  }
});

// not http or https url
test('url / not http or https url', async (t) => {
  try {
    await download('ftp://xx.com');
  } catch (error) {
    if (error && error.message === 'url is not valid') {
      t.pass();
      return;
    }

    t.log(error);
    t.fail();
  }
});

// undefined dest
test('dest / undefined dest', async (t) => {
  try {
    await download(config.url);
  } catch (error) {
    if (error && error.message === 'dest is not valid') {
      t.pass();
      return;
    }

    t.log(error);
    t.fail();
  }
});

// download / request error
test('download / request error', async (t) => {
  // res
  try {
    await download('http://url.not.exists/1.zip', './1/1/req-error.zip');
    t.pass();
  } catch (error) {
    if (error && error.code === 'EACCES') {
      t.log('permission denied');
      t.pass();
      return;
    }

    if (error && error.code === 'ENOTFOUND') {
      t.log('ENOTFOUND');
      t.pass();
      return;
    }

    t.log(error);
    t.fail();
  }
});

// download / timeout
test('download / timeout', async (t) => {
  try {
    const options = { timeout: 10 };
    await download(config.url, './1/1/timeout.zip', options);
    t.pass();
  } catch (error) {
    if (error && error.code === 'EACCES') {
      t.log('permission denied');
      t.pass();
      return;
    }

    if (error && error.message === 'timeout') {
      t.log('timeout');
      t.pass();
      return;
    }

    t.log(error);
    t.fail();
  }
});

// download / 1m
test('download / 1m', async (t) => {
  try {
    const res = await download(config.url, './1/2/1m');
    t.log(res);
    t.truthy(res);
  } catch (error) {
    if (error && error.code === 'EACCES') {
      t.log('permission denied');
      t.pass();
      return;
    }

    t.log(error);
    t.fail();
  }
});

// download / 100m
test.skip('download / 100m', async (t) => {
  // url
  const url = config['100m'];
  if (!url) {
    t.pass();
    return;
  }

  // go
  try {
    t.timeout(60 * 1000);
    const res = await download(url, './1/2/100m');
    t.log(res);
    t.truthy(res);
  } catch (error) {
    if (error && error.code === 'EACCES') {
      t.log('permission denied');
      t.pass();
      return;
    }

    t.log(error);
    t.fail();
  }
});

// download / 500m
test.skip('download / 500m', async (t) => {
  // url
  const url = config['500m'];
  if (!url) {
    t.pass();
    return;
  }

  // go
  try {
    t.timeout(120 * 1000);
    const res = await download(url, './1/2/500m');
    t.log(res);
    t.truthy(res);
  } catch (error) {
    if (error && error.code === 'EACCES') {
      t.log('permission denied');
      t.pass();
      return;
    }

    t.log(error);
    t.fail();
  }
});

// download / 1g
test.skip('download / 1g', async (t) => {
  // url
  const url = config['1g'];
  if (!url) {
    t.pass();
    return;
  }

  // go
  try {
    t.timeout(200 * 1000);
    const res = await download(url, './1/2/1g');
    t.log(res);
    t.truthy(res);
  } catch (error) {
    if (error && error.code === 'EACCES') {
      t.log('permission denied');
      t.pass();
      return;
    }

    t.log(error);
    t.fail();
  }
});

// download / on progress
test('download / on progress', async (t) => {
  try {
    const options = {
      onProgress: (p) => {
        t.log(p);
      },
    };
    const res = await download(config.url, './1/2/on-progress', options);
    t.log(res);
    t.truthy(res);
  } catch (error) {
    if (error && error.code === 'EACCES') {
      t.log('permission denied');
      t.pass();
      return;
    }

    t.log(error);
    t.fail();
  }
});
