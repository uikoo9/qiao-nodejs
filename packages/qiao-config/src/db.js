// qiao
import { path, mkdir, isExists, writeFile } from 'qiao-file';

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
  const dir = path.dirname(filePath);
  const mkdirRes = await mkdir(dir);
  console.log(`qiao-config: mkdir ${dir} ${mkdirRes}`);

  const isExistsRes = await isExists(filePath);
  if (!isExistsRes) {
    const writeFileRes = await writeFile(filePath, '{}');
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

//
export default db;
