// fs
import { path } from 'qiao-file';

// unzip
import { unzip } from 'qiao-zip';

/**
 * init
 * @param {*} root
 */
export const init = async (root) => {
  // start
  console.log('qiao-project / init / start');

  // cwd & dirname
  const cwd = process.cwd();
  console.log('qiao-project / init / cwd', cwd);
  console.log('qiao-project / init / __dirname', __dirname);

  // unzip
  const zipFile = path.resolve(__dirname, './src/init/project.zip');
  const res = await unzip(zipFile, root);
  console.log('qiao-project / init / res', res ? 'success' : 'fail');

  // res
  if (!res) process.exit(1);
};
