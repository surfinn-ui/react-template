#!/usr/bin/env node

/* tslint:disable */

// speed up `surfinn --version` et al
if (
  ['v', 'version', '-v', '--v', '-version', '--version'].includes(
    process.argv[2]
  )
) {
  var contents = require('fs').readFileSync(__dirname + '/../package.json');
  var package = JSON.parse(contents);

  // now output the version and exit
  console.log(package.version);
  process.exit(0);
}

// normal source directory
var sourceDir = __dirname + '/../.surfinn/build';

// check if we're running in dev mode
var devMode = require('fs').existsSync(`${__dirname}/../.surfinn/src`);
var wantsCompiled = process.argv.indexOf('--compiled-build') >= 0;
if (devMode && !wantsCompiled) {
  // hook into ts-node so we can run typescript on the fly
  require('ts-node').register({ project: `${__dirname}/../tsconfig.json` });
  sourceDir = __dirname + '/../.surfinn/src';
}

// kick off ignite!
require(sourceDir + '/cli').run(process.argv);
