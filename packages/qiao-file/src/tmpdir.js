// os
import os from 'os';

// path
import path from 'path';

// uuid
import { uuid } from 'qiao-encode';

// fs
import { ensureDir } from 'fs-extra';

// debug
import Debug from 'debug';
const debug = Debug('qiao-file');

/**
 * mk dir
 * @param {*} dir
 * @returns
 */
export const tmpdir = async () => {
  try {
    const tmpPath = os.tmpdir();
    const randomFolder = uuid();
    const tmpDir = path.resolve(tmpPath, randomFolder);
    debug('/ tmpdir / ', tmpDir);

    await ensureDir(tmpDir);
    debug('/ tmpdir / success');

    return tmpDir;
  } catch (e) {
    debug('/ tmpdir / fail');
    console.log(e);
  }
};
