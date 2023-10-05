// file
import { path, isExists, readFileLineByLine } from 'qiao-file';

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
export const getIgnores = async () => {
  // cwd
  const cwd = process.cwd();

  // ignore path
  const ignores = [].concat(defaultIgnores);
  const ignorePath = path.resolve(cwd, './.prettierignore');

  // check
  const ignoreExists = await isExists(ignorePath);
  if (!ignoreExists) return ignores;

  //
  return new Promise((resolve) => {
    readFileLineByLine(
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
export const isIgnore = async (filepath, ignores) => {
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
