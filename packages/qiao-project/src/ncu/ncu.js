// fs
import { path } from 'qiao-file';

// ncu
import ncu from 'npm-check-updates';

/**
 * ncuRun
 * @param {*} configPath
 */
export const ncuRun = async (configPath) => {
  // start
  console.log('qiao-project / ncuRun / start', configPath);

  // cwd & dirname
  const cwd = process.cwd();
  console.log('qiao-project / ncuRun / cwd', cwd);

  // pkg file
  const packageFile = path.resolve(cwd, './package.json');
  console.log('qiao-project / ncuRun / packageFile', packageFile);

  // ncu
  const upgraded = await ncu.run({
    packageFile: packageFile,
    upgrade: true,
  });

  console.log(upgraded); // { "mypackage": "^2.0.0", ... }
};
