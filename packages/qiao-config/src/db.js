// qiao
import { path, mkdir } from 'qiao-file';

// data
import { get, set, del, clear, all } from './_data.js';

/**
 * db
 * @param {*} dbPath
 */
const db = (dbPath) => {
  const obj = {};

  obj.path = dbPath;

  // clear
  obj.clear = async () => {
    await initDir(obj.path);
    await clear(obj.path);
  };

  // all
  obj.all = async () => {
    await initDir(obj.path);
    return await all(obj.path);
  };

  // config
  obj.config = async (key, value) => {
    await initDir(obj.path);
    return await configDB(obj.path, key, value);
  };

  return obj;
};

// init dir
async function initDir(filePath) {
  const dir = path.dirname(filePath);
  const mkdirRes = await mkdir(dir);
  console.log(`mkdir ${dir} ${mkdirRes}`);
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

//
export default db;
