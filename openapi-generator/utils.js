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
    case 'number':
      return 'number';

    case 'string':
      return 'string';

    case 'boolean':
      return 'boolean';

    case 'array':
      if (schema.items.$ref) {
        return `I${schema.items.$ref.substring(
          schema.items.$ref.lastIndexOf('/') + 1,
        )}Model[]`;
      } else {
        return `${schema.items.type}[]`;
      }

    case 'object':
      return 'object';

    default:
      if (schema.$ref) {
        return `I${schema.$ref.substring(schema.$ref.lastIndexOf('/') + 1)}Model`;
      }
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
      return convertDataType(
        refs?.substring(refs.lastIndexOf('/') + 1) || 'any',
      );
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
  return string
    .replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('-', '').replace('_', '');
    })
    .replace(/^[A-Z]/, (val) => val.toLowerCase());
}

/**
 *
 * @param {*} string
 * @returns
 */
function toPascalCase(string) {
  return toCamelCase(string).replace(/^[a-z]/, (val) => val.toUpperCase());
}

function toSnakeCase(string) {
  return string
    .replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`)
    .replace(/^[_]/, ($1) => $1.toLowerCase().replace('_', ''));
}
function toKebabCase(string) {
  return toSnakeCase(string).replace(/_/g, '');
}

function toConstantCase(string) {
  return string.replace(/([A-Z])/g, ($1) => `_${$1}`).toUpperCase();
}

function format(callback) {
  exec(`cd ../ && npm run format && cd openapi-generator`, callback);
}

/**
 *
 * @param {*} document
 * @returns
 */
function getTagNames(document) {
  return jsonpath.query(document, '$.tags[*].name');
}

/**
 *
 * @param {*} document
 * @returns
 */
function getPaths(document) {
  return jsonpath.nodes(document, '$.paths[*]');
}

/**
 *
 * @param {*} document
 * @returns
 */
function getSchemasFromComponents(document) {
  return jsonpath.nodes(document, '$.components.schemas.*');
}

module.exports = {
  convertDataType,
  isResponseTypeArray,
  returnType,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toConstantCase,
  toKebabCase,

  format,
  getTagNames,
  getPaths,
  getSchemasFromComponents,
};
