const series = require('async').series;
const SwaggerParser = require('@apidevtools/swagger-parser');

const { generateModels } = require('./generateModel');
const { generateApis } = require('./generateApi');
const { generateStores } = require('./generateStore');
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
      generateApis(bundled, (err, result) => {
        err && console.log(err);
        console.log('Generate Apis Done.');
        cb();
      }),
    (cb) =>
      generateStores(bundled, (err, result) => {
        err && console.log(err);
        console.log('Generate Stores Done.');
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
