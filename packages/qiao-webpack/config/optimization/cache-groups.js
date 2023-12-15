/**
 * default cache groups
 */
module.exports = {
  // core-js
  corejs: {
    test: /[\\/]node_modules[\\/]core-js[\\/]/,
    name: 'corejs',
    chunks: 'all',
    priority: 0,
    reuseExistingChunk: true,
  },

  // react
  react: {
    test: /[\\/]node_modules[\\/]react|react-dom|react-router|react-router-dom|@remix-run[\\/]router[\\/]/,
    name: 'react',
    chunks: 'all',
    priority: -1,
    reuseExistingChunk: true,
  },

  // axios
  axios: {
    test: /[\\/]node_modules[\\/]axios[\\/]/,
    name: 'axios',
    chunks: 'all',
    priority: -2,
    reuseExistingChunk: true,
  },

  // qiao
  'qiao-ui': {
    test: /[\\/]node_modules[\\/]qiao.cookie.js|qiao-json|qiao-ajax|qiao-service|qiao-ui[\\/]/,
    name: 'qiao-ui',
    chunks: 'all',
    priority: -3,
    reuseExistingChunk: true,
  },

  // ui
  antd: {
    test: /[\\/]node_modules[\\/]antd[\\/]/,
    name: 'antd',
    chunks: 'all',
    priority: -31,
    reuseExistingChunk: true,
  },
  bulma: {
    test: /[\\/]node_modules[\\/]bulma[\\/]/,
    name: 'bulma',
    chunks: 'all',
    priority: -32,
    reuseExistingChunk: true,
  },
  bootstrap: {
    test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
    name: 'bootstrap',
    chunks: 'all',
    priority: -33,
    reuseExistingChunk: true,
  },
  mantine: {
    test: /[\\/]node_modules[\\/]@mantine|@floating-ui|embla-carousel|embla-carousel-react[\\/]/,
    name: 'mantine',
    chunks: 'all',
    priority: -34,
    reuseExistingChunk: true,
  },
  lottie: {
    test: /[\\/]node_modules[\\/]lottie-react|lottie-web[\\/]/,
    name: 'lottie',
    chunks: 'all',
    priority: -35,
    reuseExistingChunk: true,
  },
  konva: {
    test: /[\\/]node_modules[\\/]konva|react-konva|react-konva-utils[\\/]/,
    name: 'konva',
    chunks: 'all',
    priority: -36,
    reuseExistingChunk: true,
  },

  // editor
  quill: {
    test: /[\\/]node_modules[\\/]quill[\\/]/,
    name: 'quill',
    chunks: 'all',
    priority: -41,
    reuseExistingChunk: true,
  },
  editor: {
    test: /[\\/]node_modules[\\/]@wangeditor[\\/]/,
    name: 'editor',
    chunks: 'all',
    priority: -42,
    reuseExistingChunk: true,
  },
  prismjs: {
    test: /[\\/]node_modules[\\/]prismjs[\\/]/,
    name: 'prismjs',
    chunks: 'all',
    priority: -43,
    reuseExistingChunk: true,
  },

  // others
  cryptojs: {
    test: /[\\/]node_modules[\\/]crypto-js[\\/]/,
    name: 'cryptojs',
    chunks: 'all',
    priority: -51,
    reuseExistingChunk: true,
  },
  alioss: {
    test: /[\\/]node_modules[\\/]ali-oss[\\/]/,
    name: 'alioss',
    chunks: 'all',
    priority: -52,
    reuseExistingChunk: true,
  },
  aws: {
    test: /[\\/]node_modules[\\/]@aws-crypto|@aws-sdk|@smithy|fast-xml-parser[\\/]/,
    name: 'aws',
    chunks: 'all',
    priority: -53,
    reuseExistingChunk: true,
  },

  // default
  default: {
    priority: -61,
    reuseExistingChunk: true,
  },
};
