'use strict';

var fsExtra = require('fs-extra');
var path = require('path');
var Debug = require('debug');
var os = require('os');
var qiaoEncode = require('qiao-encode');
var readline = require('readline');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(
          n,
          k,
          d.get
            ? d
            : {
                enumerable: true,
                get: function () {
                  return e[k];
                },
              },
        );
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var fsExtra__namespace = /*#__PURE__*/ _interopNamespaceDefault(fsExtra);
var path__namespace = /*#__PURE__*/ _interopNamespaceDefault(path);

// fs
const debug$7 = Debug('qiao-file');

/**
 * cp
 * @param {*} src file or folder src path
 * @param {*} dest file or folder dest path
 * @returns
 */
const cp = async (src, dest) => {
  try {
    const srcExists = await fsExtra.pathExists(src);
    if (!srcExists) {
      debug$7('/ cp / src not exists');
      return;
    }

    await fsExtra.copy(src, dest);
    debug$7('/ cp / success');

    return true;
  } catch (e) {
    debug$7('/ cp / fail');
    console.log(e);
  }
};

// fs
const debug$6 = Debug('qiao-file');

/**
 * mv
 * @param {*} oldPath
 * @param {*} newPath
 */
const mv = async (oldPath, newPath) => {
  try {
    const srcExists = await fsExtra.pathExists(oldPath);
    if (!srcExists) {
      debug$6('/ mv / src not exists');
      return;
    }

    await fsExtra.move(oldPath, newPath, { overwrite: true });
    debug$6('/ mv / success');

    return true;
  } catch (e) {
    debug$6('/ mv / fail');
    console.log(e);
  }
};

// fs
const debug$5 = Debug('qiao-file');

/**
 * rm
 * @param {*} fpath
 * @returns
 */
const rm = async (fpath) => {
  try {
    await fsExtra.remove(fpath);
    debug$5('/ rm / success');

    return true;
  } catch (e) {
    debug$5('/ rm / fail');
    console.log(e);
  }
};

// os
const debug$4 = Debug('qiao-file');

/**
 * mk dir
 * @param {*} dir
 * @returns
 */
const tmpdir = async () => {
  try {
    const tmpPath = os.tmpdir();
    const randomFolder = qiaoEncode.uuid();
    const tmpDir = path.resolve(tmpPath, randomFolder);
    debug$4('/ tmpdir / ', tmpDir);

    await fsExtra.ensureDir(tmpDir);
    debug$4('/ tmpdir / success');

    return tmpDir;
  } catch (e) {
    debug$4('/ tmpdir / fail');
    console.log(e);
  }
};

// fs
const debug$3 = Debug('qiao-file');

/**
 * mk dir
 * @param {*} dir
 * @returns
 */
const mkdir = async (dir) => {
  try {
    await fsExtra.ensureDir(dir);
    debug$3('/ mkdir / success');

    return true;
  } catch (e) {
    debug$3('/ mkdir / fail');
    console.log(e);
  }
};

// fs

/**
 * read dir
 * @param {*} dirPath
 * @returns
 */
const readdir = (dirPath) => {
  return new Promise((resolve) => {
    fsExtra.readdir(dirPath, (err, files) => {
      resolve(err ? false : files);
    });
  });
};

// fs

/**
 * is dir
 * @param {*} dir
 * @returns
 */
const isDir = async (dir) => {
  // check
  const dirExists = await fsExtra.pathExists(dir);
  if (!dirExists) return;

  // stat
  const statRes = await fsExtra.stat(dir);
  return statRes.isDirectory();
};

// path
const debug$2 = Debug('qiao-file');

/**
 * ls dir
 * @param {*} dir
 * @returns
 */
const lsdir = async (dir) => {
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
  debug$2('/ lsdir / getFoldersAndFiles / dirs', dirs);
  if (!dirs) return;

  // read
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];
    const realPath = path.resolve(fpath, dir);
    const isDirRes = await isDir(realPath);
    debug$2('/ lsdir / getFoldersAndFiles / dir', dir);
    debug$2('/ lsdir / getFoldersAndFiles / realPath', realPath);
    debug$2('/ lsdir / getFoldersAndFiles / isDirRes', isDirRes);

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

// path

/**
 * ls tree
 * @param {*} dir
 * @param {*} ignores
 * @returns
 */
const lstree = async (dir, ignores) => {
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

// path

/**
 * extname
 * @param {*} filePath
 * @returns
 */
const extname = (filePath) => {
  if (!filePath) return;

  return path.extname(filePath.toLowerCase());
};

// fs
const debug$1 = Debug('qiao-file');

/**
 * writeFile
 * @param {*} filePath
 * @param {*} fileData
 * @param {*} options https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#fswritefilesyncfile-data-options
 */
const writeFile = async (filePath, fileData, options) => {
  // check
  debug$1('/ writeFile / filePath', filePath);
  if (!filePath) return;

  try {
    // vars
    fileData = fileData || '';
    options = options || {};
    debug$1('/ writeFile / options', options);

    await fsExtra.outputFile(filePath, fileData, options);
    return true;
  } catch (e) {
    debug$1('/ writeFile / fail');
    console.log(e);
  }
};

// fs
const debug = Debug('qiao-file');

/**
 * readFile
 * @param {*} filePath
 * @param {*} options https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#fsreadfilesyncpath-options
 * @returns
 */
const readFile = async (filePath, options) => {
  // check
  debug('/ readFile / filePath', filePath);
  if (!filePath) return;

  try {
    // opt
    const opt = { encoding: 'utf8' };
    options = options || opt;
    debug('/ readFile / options', options);

    return await fsExtra.readFile(filePath, options);
  } catch (e) {
    debug('/ readFile / fail');
    console.log(e);
  }
};

// readline

/**
 * readFileLineByLine
 * @param {*} filePath
 * @param {*} onLine
 * @param {*} onClose
 */
const readFileLineByLine = (filePath, onLine, onClose) => {
  // rl
  const rl = readline.createInterface({
    input: fsExtra.createReadStream(filePath, { encoding: 'utf8' }),
  });

  // on
  rl.on('line', function (line) {
    if (onLine) onLine(line);
  });
  rl.on('close', function () {
    if (onClose) onClose();
  });
};

// fs

/**
 * is exists
 * @param {*} path
 * @returns
 */
const isExists = async (path) => {
  return await fsExtra.pathExists(path);
};

exports.fs = fsExtra__namespace;
exports.path = path__namespace;
exports.cp = cp;
exports.extname = extname;
exports.isDir = isDir;
exports.isExists = isExists;
exports.lsdir = lsdir;
exports.lstree = lstree;
exports.mkdir = mkdir;
exports.mv = mv;
exports.readFile = readFile;
exports.readFileLineByLine = readFileLineByLine;
exports.readdir = readdir;
exports.rm = rm;
exports.tmpdir = tmpdir;
exports.writeFile = writeFile;
