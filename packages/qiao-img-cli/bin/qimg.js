#!/usr/bin/env node

// qiao
const cli = require('qiao-cli');

// cmds
require('./qimg-resize.js');
require('./qimg-version.js');

// parse
cli.cmd.parse(process.argv);
