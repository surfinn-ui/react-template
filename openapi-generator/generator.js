const series = require('async').series;
const { exec } = require('child_process');
const SwaggerParser = require('@apidevtools/swagger-parser');
const jsonpath = require('jsonpath');
const fs = require('fs');

const { generateModels } = require('./generatorModel');
const { generateServiceApis } = require('./generatorApi');
const { format } = require('./utils');

async function run(api = 'petstore3.0.3.json') {
  console.log('-----------------------------------------------------');
  console.log('OPEN API CLIENT GENERATE FOR SURFINN UI');
  console.log('=====================================================');
  const bundled = await SwaggerParser.bundle(api);
  // tags(bundled);

  series([
    (cb) =>
      generateModels(bundled, (err, result) => {
        err && console.log(err);
        console.log('Generate Models Done.');
        cb();
      }),
    (cb) =>
      generateServiceApis(bundled, (err, result) => {
        err && console.log(err);
        console.log('Generate Apis Done.');
        cb();
      }),
    (cb) =>
      format(() => {
        console.log('Format Source Done.');
        cb();
      }),
  ]);
}

run();
