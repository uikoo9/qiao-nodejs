// eslint
import { ESLint } from 'eslint';

// config
import { config as defaultConfig } from './eslint-config.js';
import { getConfig } from '../util.js';

/**
 * run eslint
 */
export const runEslint = async (configPath) => {
  // start
  console.log('qiao-project / eslint / start');

  // config
  const config = getConfig(configPath, defaultConfig);
  if (!config) process.exit(1);

  // cwd
  const cwd = process.cwd();
  console.log('qiao-project / eslint / cwd', cwd);

  // extensions
  const extensions = ['.js', '.ts', '.jsx'];
  console.log('qiao-project / eslint / extensions /', extensions);

  // eslint
  const eslint = new ESLint({
    useEslintrc: false,
    overrideConfig: config,
    extensions: extensions,
    errorOnUnmatchedPattern: false,
    fix: true,
  });

  // files
  const results = await eslint.lintFiles([cwd]);
  console.log(`qiao-project / eslint / ${results.length} files`);

  // res
  const formatter = await eslint.loadFormatter('stylish');
  const resultText = formatter.format(results);

  // end
  console.log('qiao-project / eslint / end');
  if (resultText) {
    console.log(resultText);
    process.exit(1);
  }
};
