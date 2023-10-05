#!/usr/bin/env node

// qiao
const cli = require('qiao-cli');

// cmds
require('./qzip-zip.js');
require('./qzip-unzip.js');
require('./qzip-version.js');

// parse
cli.cmd.parse(process.argv);
