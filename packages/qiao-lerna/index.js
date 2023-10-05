'use strict';

var qiaoConsole = require('qiao-console');
var qiaoFile = require('qiao-file');
var qiaoParallel = require('qiao-parallel');
var qiaoNpms = require('qiao-npms');
var qiaoCli = require('qiao-cli');

// qiao

// line
let line$2 = 0;

// sub folders
const subFolders = [];

// ls dir
const lsdir = async (dir) => {
  const files = await qiaoFile.readdir(dir);
  for (let i = 0; i < files.length; i++) {
    const subPath = qiaoFile.path.resolve(dir, files[i]);
    const isDirRes = await qiaoFile.isDir(subPath);
    if (!isDirRes) continue;

    subFolders.push(subPath);
  }
};

/**
 * check dir
 * @param {*} folderName
 * @returns
 */
const checkDir = async (folderName) => {
  // check folder name
  if (!folderName) {
    qiaoConsole.writeLine(line$2, 'need folder name');
    return;
  }

  // dir
  const dir = qiaoFile.path.resolve(process.cwd(), folderName);
  const dirExists = await qiaoFile.isExists(dir);

  // check dir is folder
  if (!dirExists) {
    qiaoConsole.writeLine(line$2, 'folder is not exists');
    return;
  }

  // get sub folders
  await lsdir(dir);
  if (!subFolders || !subFolders.length) {
    qiaoConsole.writeLine(line$2, 'empty folder');
    return;
  }

  return subFolders;
};

// qiao-console

// line
let line$1;

/**
 * set line
 * @param {*} l
 */
const setLine = (l) => {
  line$1 = l;
};

/**
 * callback
 * @param {*} index
 * @param {*} res
 */
const callback = (index, res) => {
  qiaoConsole.writeLine(line$1 + index, res);
};

/**
 * complete
 * @param {*} l
 */
const complete = (l) => {
  qiaoConsole.writeLine(line$1 + l, '');
  qiaoConsole.writeLine(line$1 + l + 1, 'qiao-lerna end');
};

// fs

/**
 * get pkg info
 * @param {*} dir
 * @param {*} checkPrivate
 * @returns
 */
const getPkgInfo = async (dir, checkPrivate) => {
  // package file
  const packageFile = qiaoFile.path.resolve(dir, 'package.json');
  const packageFileExists = await qiaoFile.isExists(packageFile);
  if (!packageFileExists) return `${dir} : package.json not exists`;

  // package json
  const packageJson = getPackage(packageFile);
  if (!packageJson) return `${dir} : package.json err`;

  // package name
  const packageName = packageJson.name;
  if (packageJson.private && checkPrivate) return `${packageName} : private package`;

  // return
  return {
    packageFile: packageFile,
    packageJson: packageJson,
    packageName: packageName,
  };
};

// get package
function getPackage(p) {
  try {
    return require(p);
  } catch (e) {
    return;
  }
}

// qiao-npms

/**
 * handler
 * @param {*} folderName
 * @returns
 */
const handler = async (folderName) => {
  // pkg
  const pkgInfo = await getPkgInfo(folderName, true);
  if (typeof pkgInfo == 'string') return pkgInfo;

  // download counts
  try {
    const res = await qiaoNpms.downloadCountsLastMonth(pkgInfo.packageName);
    if (!res) return `${pkgInfo.packageName} : download counts err`;

    return `${pkgInfo.packageName} : ${res.downloads}`;
  } catch (e) {
    return `${pkgInfo.packageName} : download counts err, ${e.message}`;
  }
};

// qiao-parallel

/**
 * handle download counts
 * @param {*} folders
 * @param {*} line
 */
const handleDownloadCounts = (folders, line) => {
  setLine(line);

  qiaoParallel.parallelByIIFE(handler, folders, callback, complete);
};

// qiao-console

// line
let line = 0;

/**
 * download counts
 * @param {*} folderName
 */
const downloadCounts = async (folderName) => {
  // clear && start
  qiaoConsole.clear();
  qiaoConsole.writeLine(line++, `start operating folder: ${folderName}`);

  // dir
  const subFolders = await checkDir(folderName);

  // handler
  handleDownloadCounts(subFolders, line);
};

// cli

/**
 * pkg
 * @param {*} folderName
 * @param {*} isDev
 */
const pkg = async (folderName, isDev) => {
  // dir
  const subFolders = await checkDir(folderName);

  // check
  if (!subFolders || !subFolders.length) return;

  // for
  subFolders.forEach(async (item) => {
    // pkg
    const pkg = await getPkgInfo(item);

    // no pkg.json
    if (typeof pkg === 'string') {
      console.log(qiaoCli.colors.white(pkg));
      console.log();
      return;
    }

    // log
    console.log(qiaoCli.colors.white(pkg.packageName));

    // package json
    const packageJson = pkg.packageJson;
    const json = isDev ? packageJson.devDependencies : packageJson.dependencies;
    console.log(qiaoCli.colors.grey(json || {}));
    console.log();
  });
};

exports.downloadCounts = downloadCounts;
exports.pkg = pkg;
