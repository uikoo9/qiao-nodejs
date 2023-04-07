// path
import path from 'path';

//
import { isDir } from './is-dir.js';
import { readdir } from './readdir.js';

/**
 * ls tree
 * @param {*} dir
 * @param {*} ignores
 * @returns
 */
export const lstree = async (dir, ignores) => {
  let fileTree = [];
  await getFileTree(dir, fileTree, ignores);

  return fileTree;
};

// get file tree
async function getFileTree(fpath, fileTree, ignores) {
  // check
  const dirs = await readdir(fpath);
  if (!dirs) return;

  // read
  const realPath = path.resolve(fpath);
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];

    // ignore
    const filePath = path.resolve(realPath, dir);
    if (isFileTreeIgnore(filePath, ignores)) continue;

    // read
    const isDirRes = await isDir(dir);
    if (isDirRes) {
      let info = {};
      info.path = realPath;
      info.name = dir;
      info.children = [];

      fileTree.push(info);

      await getFileTree(filePath, info.children, ignores);
    } else {
      let info = {};
      info.path = realPath;
      info.name = dir;

      fileTree.push(info);
    }
  }
}

// is file tree ignore
function isFileTreeIgnore(rpath, ignores) {
  if (!rpath || !ignores || !ignores.length) return;

  let ignore = false;
  for (let i = 0; i < ignores.length; i++) {
    if (rpath.indexOf(ignores[i]) > -1) ignore = true;
  }

  return ignore;
}
