#!/usr/bin/env node

// qiao
const cli = require('qiao-cli');

// cmds
require('./qoss-upload-file.js');
require('./qoss-upload-folder.js');
require('./qoss-version.js');

// parse
cli.cmd.parse(process.argv);
