const series = require('async').series;
const SwaggerParser = require('@apidevtools/swagger-parser');
const { exec } = require('child_process');

const { collectTagsFromPaths, toPascalCase } = require('./utils');

const { generateModels } = require('./generateModel');
const { generateApis } = require('./generateApi');
const { generateStores } = require('./generateStore');
const { format } = require('./utils');

const args = process.argv;

if (args[2] === 'validate') {
  validate(args[3]);
  return;
}

generate(args[2]);

function validate(documentURI) {
  try {
    SwaggerParser.validate(documentURI, (err, api) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('✅ Open API Document is valid.');
    });
  } catch (err) {
    console.error(err);
  }
}

async function generate(documentURI) {
  startTime = performance.now();
  console.log('-----------------------------------------------------');
  console.log('OPEN API CLIENT GENERATE FOR SURFINN UI');
  console.log('=====================================================');

  // set to global variable
  document = await SwaggerParser.bundle(documentURI);

  findTags((result) => {
    document = result;
  });

  series([
    (callback) =>
      generateModels((err, result) => {
        err && console.log(err);
        console.log('✅ Generate Models Done.');
        callback();
      }),

    (callback) =>
      generateApis((err, result) => {
        err && console.log(err);
        console.log('✅ Generate Apis Done.');
        callback();
      }),

    (callback) =>
      generateStores((err, result) => {
        err && console.log(err);
        console.log('✅ Generate Stores Done.');
        callback();
      }),

    (callback) =>
      format(() => {
        exec(`yarn format > /dev/null`, (err, stdout, stderr) => {
          err && console.log(err);
          // stdout && console.log(stdout);
          stderr && console.log(stderr);
          console.log('✅ Format Source Done.');
          console.log('-----------------------------------------------------');
          console.log(performance.now() - startTime + 'ms');
          callback();
        });
      }),
  ]);
}

function findTags(callback) {
  const tags = collectTagsFromPaths();
  const tagSet = new Set();
  tags.forEach((tag) => {
    tagSet.add(tag);
  });

  callback({
    ...document,
    tags: [...tagSet].map((t) => ({
      name: t,
      description: `${toPascalCase(t)} Controller`,
    })),
  });
  // console.log(
  //   JSON.stringify(
  //     [...tagSet].map((t) => ({
  //       name: t,
  //       description: `${toPascalCase(t)} Controller`,
  //     })),
  //     null,
  //     2,
  //   ),
  // );
}
