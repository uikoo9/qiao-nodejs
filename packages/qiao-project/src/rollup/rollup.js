// rollup
import { rollup } from 'rollup';

// config
import { getConfig } from '../util.js';

/**
 * rollupBuild
 * @param {*} configPath
 */
export const rollupBuild = async (configPath) => {
  // start
  console.log('qiao-project / rollup / start');

  // config
  const config = getConfig(configPath);
  if (!config) process.exit(1);

  // cwd
  const cwd = process.cwd();
  console.log('qiao-project / rollup / cwd', cwd);

  // output
  const output = config.output;
  delete config.output;

  // input
  const inputOptions = config;
  const outputOptionsList = Array.isArray(output) ? output : [output];

  // go
  let bundle;
  let buildFailed = false;
  try {
    console.log(`qiao-project / rollup / input / ${inputOptions.input}`);
    bundle = await rollup(inputOptions);
    for (const outputOptions of outputOptionsList) {
      console.log(`qiao-project / rollup / output / ${outputOptions.file}`);
      await bundle.write(outputOptions);
    }

    console.log('qiao-project / rollup / end');
  } catch (error) {
    buildFailed = true;
    console.log('qiao-project / rollup / error');
    console.error(error);
  }

  // close
  if (bundle) await bundle.close();

  // exit
  process.exit(buildFailed ? 1 : 0);
};
