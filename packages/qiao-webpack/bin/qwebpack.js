#!/usr/bin/env node

// qiao
const qiao = {};
qiao.cli = require('qiao-cli');

// cmds
require('./qwebpack-version.js');
require('./qwebpack-build.js');

// parse
qiao.cli.cmd.parse(process.argv);
