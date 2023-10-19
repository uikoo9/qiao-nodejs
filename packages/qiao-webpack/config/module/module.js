// rule for css
const ruleForCss = require('./rule-for-css.js');

// rule for less
const ruleForLess = require('./rule-for-less.js');

// rule for sass
const ruleForSass = require('./rule-for-sass.js');

// rule for img
const ruleForImg = require('./rule-for-img.js');

// rule for js
const ruleForJs = require('./rule-for-js.js');

// rule for react
const ruleForReact = require('./rule-for-react.js');

// rule for ejs
const ruleForEjs = require('./rule-for-ejs.js');

/**
 * module
 * @param {*} isDev
 * @param {*} cssIncludes
 * @param {*} postCssConfig
 */
module.exports = function (isDev, cssIncludes, postCssConfig) {
  return {
    rules: [
      ruleForCss(isDev, cssIncludes),
      ruleForLess(isDev),
      ruleForSass(isDev, postCssConfig),
      ruleForReact(isDev),
      ruleForJs,
      ruleForImg,
      ruleForEjs,
    ],
  };
};
