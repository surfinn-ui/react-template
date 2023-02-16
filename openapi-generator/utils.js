const jsonpath = require('jsonpath');
const { exec } = require('child_process');

/**
 *
 * @param {*} schema
 * @returns
 */
function convertDataType(schema) {
  switch (schema.type) {
    case 'integer':
      return 'number';
    case 'number':
      return 'number';
    case 'string':
      return 'string';
    case 'boolean':
      return 'boolean';
    case 'array':
      if (schema.items.$ref) {
        return `${schema.items.$ref.replace('#', '$').replace('/', '.')}[]`;
      } else {
        return `${schema.items.type}[]`;
      }
    case 'object':
      return 'object';
  }
}

/**
 *
 * @param {*} string
 * @returns
 */
function toCamelCase(string) {
  return string.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
}

/**
 *
 * @param {*} string
 * @returns
 */
function toPascalCase(string) {
  return toCamelCase(string).replace(/^[a-z]/, (val) => val.toUpperCase());
}



function format(cb) {
  exec(`cd ../ && npm run format && cd openapi-generator`, cb);
}

/**
 *
 * @param {*} api
 * @returns
 */
function getTagNames(api) {
  return jsonpath.query(api, '$.tags[*].name');
}

/**
 *
 * @param {*} api
 * @returns
 */
function getPaths(api) {
  return jsonpath.nodes(api, '$.paths[*]');
}

/**
 *
 * @param {*} api
 * @returns
 */
function getSchemes(api) {
  return jsonpath.nodes(api, '$.components.schemas.*');
}

module.exports = {
  convertDataType,
  toCamelCase,
  toPascalCase,
  format,
  getTagNames,
  getPaths,
  getSchemes,

}