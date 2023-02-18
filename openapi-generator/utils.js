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
        // return `${schema.items.$ref.replace('#', '$').replaceAll('/', '.')}[]`;
        return `I${schema.items.$ref.substring(
          schema.items.$ref.lastIndexOf('/') + 1,
        )}Model[]`;
      } else {
        return `${schema.items.type}[]`;
      }
    case 'object':
      return 'object';
    default:
      return 'any';
  }
}

function isResponseTypeArray(node, method) {
  return (
    jsonpath.query(node[method], '$..responses..content[*].schema.type')[0] ===
    'array'
  );
}


function returnType(node, method) {
  let refs;
  if (isResponseTypeArray(node, method)) {
    refs = jsonpath.query(node[method], '$.responses..items["$ref"]')[0];
    return `I${refs.substring(refs.lastIndexOf('/') + 1)}Model`;
  } else {
    refs = jsonpath.query(node[method], '$.responses..schema["$ref"]')[0];
    if (refs === undefined) {
      refs = jsonpath.query(node[method], '$.responses..schema.type')[0];
      return convertDataType(refs?.substring(refs.lastIndexOf('/') + 1) || 'any');
    }
    return `I${refs.substring(refs.lastIndexOf('/') + 1)}Model`;
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
function getSchemasFromComponents(api) {
  return jsonpath.nodes(api, '$.components.schemas.*');
}

module.exports = {
  convertDataType,
  isResponseTypeArray,
  returnType,
  toCamelCase,
  toPascalCase,
  format,
  getTagNames,
  getPaths,
  getSchemasFromComponents,
};
