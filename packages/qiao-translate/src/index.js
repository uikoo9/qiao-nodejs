// translate
import { translateTxt } from './translate.js';

/**
 * default
 */
export default (options) => {
  // app
  const app = {};
  app.translateTxt = async (src, target, txt) => {
    return await translateTxt(options, src, target, txt);
  };

  // return
  return app;
};
