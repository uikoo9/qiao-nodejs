#!/usr/bin/env node

// qiao
const cli = require('qiao-cli');

// cmds
require('./qpro-commitizen.js');
require('./qpro-dc.js');
require('./qpro-eslint.js');
require('./qpro-npm.js');
require('./qpro-pkg.js');
require('./qpro-prettier.js');
require('./qpro-rollup.js');
require('./qpro-version.js');

// parse
cli.cmd.parse(process.argv);
