// file
import { path, lsdir } from 'qiao-file';

/**
 * get npm pkgs
 * @param {*} cwd
 * @returns
 */
export const getNPMPkgs = async (cwd) => {
  try {
    const allPkgPaths = [];

    const rootPkg = path.resolve(cwd, './package.json');
    allPkgPaths.push(rootPkg);

    const packagesPath = path.resolve(cwd, './packages');
    const packages = await lsdir(packagesPath);
    if (packages && packages.files && packages.files.length) {
      for (let i = 0; i < packages.files.length; i++) {
        const pkgPath = packages.files[i];
        if (pkgPath.name === 'package.json' && pkgPath.path.indexOf('node_modules') === -1)
          allPkgPaths.push(pkgPath.path);
      }
    }

    return allPkgPaths;
  } catch (error) {
    console.log('qiao-project / npm / error', error);
    process.exit(1);
  }
};
