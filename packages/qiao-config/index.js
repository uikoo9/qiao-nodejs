'use strict';

var path = require('path');
var qiaoFile = require('qiao-file');

// io

/**
 * clear
 * @param {*} filePath
 * @returns
 */
const clear = async (filePath) => {
  // check
  if (!filePath) {
    console.log('qiao-config:clear, need path');
    return;
  }

  // io
  try {
    await qiaoFile.writeFile(filePath, '');
  } catch (e) {
    console.log(`qiao-config:clear, write file error ${e.message}`);
  }
};

/**
 * all
 * @param {*} filePath
 * @returns
 */
const all = async (filePath) => {
  // check
  if (!filePath) {
    console.log('qiao-config:all, need path');
    return;
  }

  let json;
  try {
    const jsonStr = await qiaoFile.readFile(filePath);

    json = JSON.parse(jsonStr);
  } catch (e) {
    json = {};
  }

  return json;
};

/**
 * get
 * @param {*} filePath
 * @param {*} key
 * @returns
 */
const get = async (filePath, key) => {
  // check
  if (!filePath) {
    console.log('qiao-config:get, need path');
    return;
  }
  if (typeof key == 'undefined') {
    console.log('qiao-config:get, need key');
    return;
  }

  // get
  const json = await all(filePath);
  return json[key];
};

/**
 * set
 * @param {*} filePath
 * @param {*} key
 * @param {*} value
 * @returns
 */
const set = async (filePath, key, value) => {
  // check
  if (!filePath) {
    console.log('qiao-config:set, need path');
    return;
  }
  if (typeof key == 'undefined') {
    console.log('qiao-config:set, need key');
    return;
  }

  // set
  const json = await all(filePath);
  json[key] = value;

  // io
  try {
    await qiaoFile.writeFile(filePath, JSON.stringify(json));
  } catch (e) {
    console.log(`qiao-config:set, write file error ${e.message}`);
  }
};

/**
 * del
 * @param {*} filePath
 * @param {*} key
 * @returns
 */
const del = async (filePath, key) => {
  // check
  if (!filePath) {
    console.log('qiao-config:del, need path');
    return;
  }
  if (typeof key == 'undefined') {
    console.log('qiao-config:del, need key');
    return;
  }

  // get
  const v = await get(filePath, key);
  if (!v) return;

  // del
  const json = await all(filePath);
  delete json[key];

  // io
  try {
    await qiaoFile.writeFile(filePath, JSON.stringify(json));
  } catch (e) {
    console.log(`qiao-config:del, write file error ${e.message}`);
  }
};

// qiao

/**
 * db
 * @param {*} dbPath
 */
const db = (dbPath) => {
  const obj = {};

  obj.path = dbPath;

  // clear
  obj.clear = async () => {
    await initDirAndFile(obj.path);
    await clear(obj.path);
  };

  // all
  obj.all = async () => {
    await initDirAndFile(obj.path);
    return await all(obj.path);
  };

  // config
  obj.config = async (key, value) => {
    await initDirAndFile(obj.path);
    return await configDB(obj.path, key, value);
  };

  return obj;
};

// init dir
async function initDirAndFile(filePath) {
  const dir = qiaoFile.path.dirname(filePath);
  const mkdirRes = await qiaoFile.mkdir(dir);
  console.log(`qiao-config: mkdir ${dir} ${mkdirRes}`);

  const isExistsRes = await qiaoFile.isExists(filePath);
  if (!isExistsRes) {
    const writeFileRes = await qiaoFile.writeFile(filePath, '{}');
    console.log(`qiao-config: init json ${writeFileRes}`);
  }
}

// config db
async function configDB(filePath, key, value) {
  // remove
  if (value === null) {
    await del(filePath, key);
    return;
  }

  // get
  if (typeof value == 'undefined') {
    return await get(filePath, key);
  }

  // set
  await set(filePath, key, value);
}

// path

/**
 * qiao config
 */
var index = (filePath) => {
  // path
  const defaultPath = path.resolve(__dirname, './config.json');
  const finalPath = !filePath ? defaultPath : path.resolve(process.cwd(), filePath);

  // db
  return db(finalPath);
};

module.exports = index;
