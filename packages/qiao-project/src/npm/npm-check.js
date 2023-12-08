// file
import { readFile } from 'qiao-file';

/**
 * check pkgs
 * @param {*} pkgs
 * @param {*} config
 */
export const checkPkgs = async (pkgs, config) => {
  if (!pkgs || !pkgs.length || !config) {
    console.log('qiao-project / npm / error / empty pkg or config');
    process.exit(1);
  }

  const dependencies = [];
  for (let i = 0; i < pkgs.length; i++) {
    const pkg = pkgs[i];
    console.log('qiao-project / npm / parse / ', pkg);

    try {
      const pkgStr = await readFile(pkg);
      const pkgJson = JSON.parse(pkgStr);
      if (pkgJson) {
        if (pkgJson.dependencies) dependencies.push(...Object.keys(pkgJson.dependencies));
        if (pkgJson.devDependencies) dependencies.push(...Object.keys(pkgJson.devDependencies));
      }
    } catch (error) {
      console.log('qiao-project / npm / error / parse json error');
      process.exit(1);
    }
  }

  // check
  for (let i = 0; i < config.length; i++) {
    const configItem = config[i];
    console.log('qiao-project / check / ', configItem.name);

    for (let j = 0; j < configItem.notRecommended.length; j++) {
      const notRecommended = configItem.notRecommended[j];
      if (dependencies.includes(notRecommended)) {
        console.log(
          `qiao-project / not recommended pkg / ${notRecommended} / please use ${configItem.recommended.npm}: ${configItem.recommended.doc}`,
        );
      }
    }
  }
};
