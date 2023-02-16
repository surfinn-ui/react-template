const series = require('async').series;
const { exec } = require('child_process');
const jsonpath = require('jsonpath');
const fs = require('fs');
const {
  convertDataType,
  toCamelCase,
  toPascalCase,
  format,
  getTagNames,
  getPaths,
  getSchemes,
} = require('./utils');

/**
 * generate store
 * 
 * @param {*} api 
 * @param {*} cb 
 */
function generateStores(api, cb) {
  const generators = [];
  getTagNames(api).forEach((tag) => {
    generators.push((cb) => {
      try {
        exec(`cd ../ && npx ignite-cli generate "store" "${tag}"`, cb);
      } catch (e) {
        console.log('ERROR', e);
      }
    });
  });
  series(generators, cb);
}

module.exports = {
  generateStores,
}
