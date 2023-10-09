// eslint
import * as prettier from 'prettier';

// qiao
import { lsdir, readFile, writeFile } from 'qiao-file';

// config
import { config as defaultConfig } from './prettier-config.js';
import { getConfig } from '../util.js';

// ignore
import { isIgnore, getIgnores } from './prettier-ignore.js';

/**
 * run prettier
 */
export const runPrettier = async (configPath) => {
  // start
  console.log('qiao-project / prettier / start');

  // config
  const config = getConfig(configPath, defaultConfig);
  if (!config) process.exit(1);

  // cwd
  const cwd = process.cwd();
  console.log('qiao-project / prettier / cwd', cwd);

  // format
  await formatFiles(cwd, config);
};

// format files
async function formatFiles(cwd, config) {
  try {
    // check
    const res = await lsdir(cwd);
    if (!res || !res.files || !res.files.length) {
      console.log('qiao-project / prettier / format / no files');
      process.exit(1);
    }

    // files
    const files = res.files;
    const ignores = await getIgnores();
    console.log(ignores);
    for (let i = 0; i < files.length; i++) {
      // filepath
      const filepath = files[i].path;
      const fileIgnore = await isIgnore(filepath, ignores);
      if (fileIgnore) continue;
      console.log('qiao-project / prettier / format ', filepath);

      try {
        // check
        config.filepath = filepath;
        const content = await readFile(filepath);
        const isFormated = await prettier.check(content, config);

        // format
        if (isFormated) continue;
        const formatContent = await prettier.format(content, config);
        await writeFile(filepath, formatContent);
      } catch (error) {
        console.log('qiao-project / prettier / format / continue');
        continue;
      }
    }
    console.log('qiao-project / prettier / end');
  } catch (error) {
    console.log('qiao-project / prettier / format /', error);
    process.exit(1);
  }
}
