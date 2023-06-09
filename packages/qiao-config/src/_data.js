// io
import { writeFile, readFile } from 'qiao-file';

/**
 * clear
 * @param {*} filePath
 * @returns
 */
export const clear = async (filePath) => {
  // check
  if (!filePath) {
    console.log('qiao-config:clear, need path');
    return;
  }

  // io
  try {
    await writeFile(filePath, '');
  } catch (e) {
    console.log(`qiao-config:clear, write file error ${e.message}`);
  }
};

/**
 * all
 * @param {*} filePath
 * @returns
 */
export const all = async (filePath) => {
  // check
  if (!filePath) {
    console.log('qiao-config:all, need path');
    return;
  }

  let json;
  try {
    const jsonStr = await readFile(filePath);

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
export const get = async (filePath, key) => {
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
export const set = async (filePath, key, value) => {
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
    await writeFile(filePath, JSON.stringify(json));
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
export const del = async (filePath, key) => {
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
    await writeFile(filePath, JSON.stringify(json));
  } catch (e) {
    console.log(`qiao-config:del, write file error ${e.message}`);
  }
};
