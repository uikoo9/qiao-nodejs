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

  // array
  if (Array.isArray(config)) {
    for (const configItem of config) {
      const buildFailed = await build(configItem);
      if (buildFailed) process.exit(1);
    }
  } else {
    const buildFailed = await build(config);
    if (buildFailed) process.exit(1);
  }
};

// build
async function build(config) {
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

  // return
  return buildFailed;
}
