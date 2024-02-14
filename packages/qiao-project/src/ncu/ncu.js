// fs
import { path } from 'qiao-file';

// ncu
import ncu from 'npm-check-updates';

/**
 * ncuRun
 * @param {*} forceUpdate
 */
export const ncuRun = async (forceUpdate) => {
  // start
  console.log('qiao-project / ncuRun / forceUpdate', !!forceUpdate);

  // pkg file
  const cwd = process.cwd();
  const packageFile = path.resolve(cwd, './package.json');
  console.log('qiao-project / ncuRun / packageFile', packageFile);

  // ncu
  const upgraded = await ncu.run({
    packageFile: packageFile,
    upgrade: !!forceUpdate,
  });

  console.log('qiao-project / ncuRun / upgraded', upgraded);
};
