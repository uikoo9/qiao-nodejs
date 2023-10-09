/**
 * getConfig
 * @param {*} configPath
 * @param {*} defaultConfig
 * @returns
 */
export const getConfig = (configPath, defaultConfig) => {
  try {
    let config;
    if (configPath) {
      config = require(configPath);
      console.log('qiao-project / getConfig /', configPath);
    } else {
      config = defaultConfig;
      console.log('qiao-project / getConfig / default config');
    }

    console.log(config);
    return config;
  } catch (error) {
    console.log('qiao-project / getConfig /', error);
  }
};
