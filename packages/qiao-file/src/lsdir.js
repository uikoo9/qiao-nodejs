// path
import path from 'path';

//
import { isDir } from './is-dir.js';
import { readdir } from './readdir.js';

// debug
import Debug from 'debug';
const debug = Debug('qiao-file');

/**
 * ls dir
 * @param {*} dir
 * @returns
 */
export const lsdir = async (dir) => {
  let folders = [];
  let files = [];
  await getFoldersAndFiles(dir, folders, files);

  return {
    folders: folders,
    files: files,
  };
};

// get folders and files
async function getFoldersAndFiles(fpath, folders, files) {
  // check
  const dirs = await readdir(fpath);
  debug('/ lsdir / getFoldersAndFiles / dirs', dirs);
  if (!dirs) return;

  // read
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];
    const realPath = path.resolve(fpath, dir);
    const isDirRes = await isDir(realPath);
    debug('/ lsdir / getFoldersAndFiles / dir', dir);
    debug('/ lsdir / getFoldersAndFiles / realPath', realPath);
    debug('/ lsdir / getFoldersAndFiles / isDirRes', isDirRes);

    //
    if (isDirRes) {
      folders.push({
        path: realPath,
        name: dir,
      });

      await getFoldersAndFiles(realPath, folders, files);
    } else {
      files.push({
        path: realPath,
        name: dir,
      });
    }
  }
}
