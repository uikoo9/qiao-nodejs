'use strict';

var qiaoConsole = require('qiao-console');
var qiaoFile = require('qiao-file');
var qiaoParallel = require('qiao-parallel');
var qiaoNpms = require('qiao-npms');
var qiaoCli = require('qiao-cli');
var eslint = require('eslint');
var prettier = require('prettier');

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

var prettier__namespace = /*#__PURE__*/ _interopNamespaceDefault(prettier);

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

/**
 * eslint config
 */
const config$1 = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2022: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],

    'react/display-name': 'off',
    'react/prop-types': 'off',
  },
};

// eslint

/**
 * run eslint
 */
const runEslint = async (configPath) => {
  // start
  console.log('qiao-project / eslint / start');

  // config
  const config = getConfig$1(configPath);
  if (!config) return;

  // cwd
  const cwd = process.cwd();
  console.log('qiao-project / eslint / cwd', cwd);

  // extensions
  const extensions = ['.js', '.ts', '.jsx'];
  console.log('qiao-project / eslint / extensions /', extensions);

  // eslint
  const eslint$1 = new eslint.ESLint({
    useEslintrc: false,
    overrideConfig: config,
    extensions: extensions,
    errorOnUnmatchedPattern: false,
    fix: true,
  });

  // files
  const results = await eslint$1.lintFiles([cwd]);
  console.log(`qiao-project / eslint / ${results.length} files`);

  // res
  const formatter = await eslint$1.loadFormatter('stylish');
  const resultText = formatter.format(results);

  // end
  console.log('qiao-project / eslint / end');
  if (resultText) {
    console.log(resultText);
    process.exit(1);
  }
};

// get config
function getConfig$1(configPath) {
  try {
    let eslintConfig;
    if (configPath) {
      eslintConfig = require(configPath);
      console.log('qiao-project / eslint / config /', configPath);
    } else {
      eslintConfig = config$1;
      console.log('qiao-project / eslint / config / default config');
    }

    console.log(eslintConfig);
    return eslintConfig;
  } catch (error) {
    console.log('qiao-project / eslint / config /', error);
  }
}

/**
 * prettier config
 */
const config = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  vueIndentScriptAndStyle: false,
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
};

// file

// default ignores
const defaultIgnores = [
  '.db',

  '.git',

  '.art',
  '.ejs',
  '.sql',

  '.icns',
  '.jpg',
  '.png',
  '.svg',
  '.webp',

  '.ttf',
  '.woff',
  '.woff2',

  '.DS_Store',

  '.czrc',
  '.husky',
  '.eslintignore',
  '.prettierignore',

  'LICENSE',
  'node_modules',
  'package-lock.json',
];

/**
 * get ignores
 * @returns
 */
const getIgnores = async () => {
  // cwd
  const cwd = process.cwd();

  // ignore path
  const ignores = [].concat(defaultIgnores);
  const ignorePath = qiaoFile.path.resolve(cwd, './.prettierignore');

  // check
  const ignoreExists = await qiaoFile.isExists(ignorePath);
  if (!ignoreExists) return ignores;

  //
  return new Promise((resolve) => {
    qiaoFile.readFileLineByLine(
      ignorePath,
      (line) => {
        if (!line.startsWith('#') && line) ignores.push(line);
      },
      () => {
        const uniqueIgnores = [...new Set(ignores)];
        resolve(uniqueIgnores);
      },
    );
  });
};

/**
 * is ignore
 * @param {*} filepath
 * @param {*} ignores
 * @returns
 */
const isIgnore = async (filepath, ignores) => {
  // check
  let ignore = false;
  for (let i = 0; i < ignores.length; i++) {
    if (filepath.indexOf(ignores[i]) > -1) {
      ignore = true;
      break;
    }
  }

  return ignore;
};

// eslint

/**
 * run prettier
 */
const runPrettier = async (configPath) => {
  // start
  console.log('qiao-project / prettier / start');

  // config
  const config = getConfig(configPath);
  if (!config) return;

  // cwd
  const cwd = process.cwd();
  console.log('qiao-project / prettier / cwd', cwd);

  // format
  await formatFiles(cwd, config);
};

// get config
function getConfig(configPath) {
  try {
    let eslintConfig;
    if (configPath) {
      eslintConfig = require(configPath);
      console.log('qiao-project / prettier / config /', configPath);
    } else {
      eslintConfig = config;
      console.log('qiao-project / prettier / config / default config');
    }

    console.log(eslintConfig);
    return eslintConfig;
  } catch (error) {
    console.log('qiao-project / prettier / config /', error);
  }
}

// format files
async function formatFiles(cwd, config) {
  try {
    // check
    const res = await qiaoFile.lsdir(cwd);
    if (!res || !res.files || !res.files.length) {
      console.log('qiao-project / prettier / format / no files');
      return;
    }

    // files
    const files = res.files;
    const ignores = await getIgnores();
    console.log(ignores);
    for (let i = 0; i < files.length; i++) {
      // filepath
      const filepath = files[i].path;
      const fileIgnore = await isIgnore(filepath, ignores);
      if (fileIgnore) continue;
      console.log('qiao-project / prettier / format ', filepath);

      try {
        // check
        config.filepath = filepath;
        const content = await qiaoFile.readFile(filepath);
        const isFormated = await prettier__namespace.check(content, config);

        // format
        if (isFormated) continue;
        const formatContent = await prettier__namespace.format(content, config);
        await qiaoFile.writeFile(filepath, formatContent);
      } catch (error) {
        console.log('qiao-project / prettier / format / continue');
        continue;
      }
    }
    console.log('qiao-project / prettier / end');
  } catch (error) {
    console.log('qiao-project / prettier / format /', error);
  }
}

exports.downloadCounts = downloadCounts;
exports.pkg = pkg;
exports.runEslint = runEslint;
exports.runPrettier = runPrettier;
