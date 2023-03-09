const jsonpath = require('jsonpath');
const { exec } = require('child_process');
const fs = require('fs');
const { json } = require('stream/consumers');

function typeDetect(type) {
  if (!type) return null;
  if (['boolean'].includes(type)) return 'string';
  if (['number', 'integer'].includes(type)) return 'string';
  if (['string'].includes(type)) return 'number';
  if (['array'].includes(type)) return 'array';
  if (['object'].includes(type)) return 'object';
  return 'any';
}

/**
 *
 * @param {*} schema
 * @returns
 */
function convertDataType(schema) {
  const type = typeDetect(schema?.type);
  if (type) {
    if (type === 'array') {
      if (schema.items.$ref) {
        return `I${toPascalCase(
          schema.items.$ref.substring(schema.items.$ref.lastIndexOf('/') + 1),
        )}Model[]`;
      } else {
        const type = typeDetect(schema.items.type);
        return `${type}[]`;
      }
    }

    if (type === 'object') {
      return 'object';
    }
  }

  // 참조인 경우
  if (schema?.$ref) {
    return `I${toPascalCase(
      schema.$ref.substring(schema.$ref.lastIndexOf('/') + 1),
    )}Model`;
  }

  return 'any';
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
    if (refs) {
      return `I${toPascalCase(refs.substring(refs.lastIndexOf('/') + 1))}Model`;
    } else {
      return `${jsonpath.query(node[method], '$.responses..items.type')[0]}[]`;
    }
  } else {
    refs = jsonpath.query(node[method], '$.responses..schema["$ref"]')[0];
    if (refs) {
      return `I${toPascalCase(refs.substring(refs.lastIndexOf('/') + 1))}Model`;
    } else {
      refs = jsonpath.query(node[method], '$.responses..schema.type')[0];
      return convertDataType(
        refs?.substring(refs.lastIndexOf('/') + 1) || 'any',
      );
    }
  }
}

function addImports(filepath, imports, callback) {
  fs.readFile(filepath, 'utf8', (err, file) => {
    if (err) {
      console.log(err);
    } else {
      let codeLines = [];
      codeLines = file.toString().split('\n');
      const _imports = imports.filter((i) => !codeLines.includes(i));
      const index = codeLines.findLastIndex((line) =>
        line.startsWith(`import `),
      );
      codeLines.splice(index + 1, 0, ..._imports);
      fs.writeFile(filepath, codeLines.join('\n'), () => {
        callback();
      });
    }
  });
}

/**
 *
 * @param {*} string
 * @returns
 */
function toCamelCase(string) {
  // console.log(`toCamelCase:"${string}"`);
  return string
    .replace(/([-_ \/][a-z0-9])/gi, ($1) => {
      return $1
        .toUpperCase()
        .replace('-', '')
        .replace('_', '')
        .replace('/', '')
        .replace(' ', '');
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
 * @returns
 */
function getSchemasFromComponents() {
  // console.log('getSchemasFromComponents', document);
  return jsonpath.nodes(document, '$.components.schemas.*');
}
// ------------------------------------------------------------------

// ------------------------------------------------------------------
function getServers() {
  return jsonpath.query(document, '$.servers[*]');
}
function getTags() {
  return jsonpath.query(document, '$.tags[*]');
}
function getTagNames() {
  return jsonpath.query(document, '$.tags[*].name');
}
function getPaths() {
  return jsonpath.nodes(document, '$.paths[*]');
}
function getOperationIds() {
  return jsonpath.query(document, '$.paths[*].operationId');
}
function collectTagsFromPaths() {
  return jsonpath.query(document, '$.paths[*]..tags[*]');
}

function getComponentBy$ref($ref) {
  const ref = $ref
    .replace(/^#/, '$')
    .split('/')
    .join('.')
    .replace(/(\.[^\.]+)$/, ($1) => {
      return `["${$1.replace('.', '')}"]`;
    });
  return jsonpath.query(document, `${ref}`)[0];
}

// paths ----------------------------------------------------------------
function getParametersByPathAndMethod(path, method) {
  return jsonpath
    .query(document, `$.paths.${path}[*].parameters[${method}]`)
    .map((p) => {
      if (p.$ref) {
        return getComponentBy$ref(p.$ref);
      } else {
        return p;
      }
    });
}
function getResponsesByPathAndMethod(path, method) {
  return jsonpath
    .query(document, `$.paths.${path}[*].responses[${method}]`)
    .map((p) => {
      if (p.$ref) {
        return getComponentBy$ref(p.$ref);
      } else {
        return p;
      }
    });
}
function getRequestBodyByPathAndMethod(path, method) {
  return jsonpath
    .query(document, `$.paths.${path}[*].requestBody[${method}]`)
    .map((p) => {
      if (p.$ref) {
        return getComponentBy$ref(p.$ref);
      } else {
        return p;
      }
    });
}

module.exports = {
  getServers,
  getTags,
  getPaths,
  getOperationIds,
  getTagNames,

  getComponentBy$ref,

  getParametersByPathAndMethod,
  getResponsesByPathAndMethod,
  getRequestBodyByPathAndMethod,

  collectTagsFromPaths,

  // ----------------------------------

  convertDataType,
  isResponseTypeArray,
  returnType,

  format,
  getSchemasFromComponents,

  addImports,

  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toConstantCase,
  toKebabCase,
};
