// translate
import { translateTxt } from './translate.js';

/**
 * default
 */
export default (options) => {
  // app
  const app = {};
  app.translateTxt = (src, target, txt) => {
    return translateTxt(options, src, target, txt);
  };

  // return
  return app;
};
