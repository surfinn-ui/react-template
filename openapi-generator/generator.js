const series = require('async').series;
const SwaggerParser = require('@apidevtools/swagger-parser');

const { generateModels } = require('./generateModel');
const { generateApis } = require('./generateApi');
const { generateStores } = require('./generateStore');
const { format } = require('./utils');

async function generate(doc) {
  console.log('-----------------------------------------------------');
  console.log('OPEN API CLIENT GENERATE FOR SURFINN UI');
  console.log('=====================================================');
  const document = await SwaggerParser.bundle(doc);
  // tags(bundled);

  series([
    (callback) =>
      generateModels(document, (err, result) => {
        err && console.log(err);
        console.log('✅ Generate Models Done.');
        callback();
      }),
    (callback) =>
      generateApis(document, (err, result) => {
        err && console.log(err);
        console.log('✅ Generate Apis Done.');
        callback();
      }),
    (callback) =>
      generateStores(document, (err, result) => {
        err && console.log(err);
        console.log('✅ Generate Stores Done.');
        // console.log('-----------------------------------------------------');
        // console.log(result);
        // console.log('-----------------------------------------------------');
        callback();
      }),
    (callback) =>
      format(() => {
        console.log('✅ Format Source Done.');
        callback();
      }),
  ]);
}

// generate('petstore3.0.3.json');
// generate('/petstore3.0.3.yml');
// generate();
const args = process.argv
generate(args[2]);
