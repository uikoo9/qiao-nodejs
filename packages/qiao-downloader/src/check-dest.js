// fs
import { path, mkdir } from 'qiao-file';

/**
 * check dest
 * @param {*} dest
 * @returns
 */
export const checkDest = async (dest) => {
  // check dest
  if (!dest) return;

  // absolute dest
  const destIsAbsolute = path.isAbsolute(dest);
  if (!destIsAbsolute) dest = path.resolve(process.cwd(), dest);

  // mkdir
  const dir = path.dirname(dest);
  const mkdirRes = await mkdir(dir);
  if (!mkdirRes) return;

  // return
  return dest;
};
