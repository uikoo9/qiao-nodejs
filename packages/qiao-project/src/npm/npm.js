// config
import { config as defaultConfig } from './npm-config.js';
import { getConfig } from '../util.js';

// pkgs
import { getNPMPkgs } from './npm-pkgs.js';
import { checkPkgs } from './npm-check.js';

/**
 * check npm packages
 */
export const checkNPMPackage = async (configPath) => {
  // start
  console.log('qiao-project / npm / start');

  // config
  const config = getConfig(configPath, defaultConfig);
  if (!config) process.exit(1);

  // cwd
  const cwd = process.cwd();
  console.log('qiao-project / npm / cwd', cwd);

  // pkgs
  const pkgs = await getNPMPkgs(cwd);
  await checkPkgs(pkgs, config);
};
