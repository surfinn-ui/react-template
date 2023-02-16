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
 * generate service apis
 * 
 * @param {*} api 
 * @param {*} cb 
 */
async function generateApis(api, cb) {
  const generators = [];

  // generate service api by tags
  getTagNames(api).forEach((tag) => {
    generators.push((cb) => {
      try {
        exec(`cd ../ && yarn gen "api" "${tag}"`, cb);
      } catch (e) {
        console.log('ERROR', e);
      }
    });
  });

  // add api for each path by first tag
  getPaths(api).forEach((node) => {
    const path = node.path.pop();
    const object = node.value;
    const tag = jsonpath.query(object, '$..tags[0]')[0];
    // console.log(path, object, tag);
    generators.push((cb) => {
      try {
        addMethodToApi(tag, path, object, cb);
      } catch (e) {
        console.log('ERROR', e);
      }
    });
  });

  // add imports to the model
  // TODO add imports to the api
  getPaths(api).forEach((node) => {
    const object = node.value;
    const tag = jsonpath.query(object, '$..tags[0]')[0];
    const imports = new Set();
    const resRefs = jsonpath
      .query(object, '$..responses..["$ref"]')
      .map((ref) => ref.substring(ref.lastIndexOf('/') + 1));
    resRefs.forEach((ref) => {
      imports.add(`import { I${ref}Model } from '../../models/${ref}.model';`);
    });
    generators.push((cb) => addImportsToApi(tag, [...imports], cb));
  });

  series(generators, cb);
}

/**
 *
 * @param {*} name
 * @param {*} imports
 * @param {*} cb
 */
function addImportsToApi(name, imports, cb) {
  const filepath = `../src/services/api/${name}.api.ts`;
  fs.readFile(filepath, 'utf8', (err, file) => {
    if (err) {
      console.log(err);
    } else {
      let codeLines = [];
      codeLines = file.toString().split('\n');
      const index = codeLines.findIndex((line) =>
        line.includes(`import { ApiBase } from './api.base'`),
      );
      imports.forEach((importCode) => {
        if (!codeLines.includes(importCode)) {
          codeLines.splice(index + 1, 0, importCode);
        }
      });
      fs.writeFile(filepath, codeLines.join('\n'), () => {
        console.log('write', filepath);
        cb();
      });
    }
  });
}

/**
 *
 * @param {*} tag
 * @param {*} path
 * @param {*} node
 * @param {*} cb
 */
function addMethodToApi(tag, path, node, cb) {
  const filepath = `../src/services/api/${toPascalCase(tag)}.api.ts`;

  let codeLines = [];

  fs.readFile(filepath, 'utf8', (err, file) => {
    if (err) {
      console.log(err);
    } else {
      codeLines = file.toString().split('\n');
      const index = codeLines.findIndex((line) =>
        line.includes(`url = '/${tag}'`),
      );

      // add api codes

      const apiCode = getApiCode(tag, path, node);
      codeLines.splice(index + 1, 0, apiCode);
      fs.writeFile(filepath, codeLines.join('\n'), () => {
        console.log('write', filepath);
        cb();
      });
    }
  });
}

/**
 *
 * @param {*} tag
 * @param {*} path
 * @param {*} node
 * @returns
 */
function getApiCode(tag, path, node) {
  const codeLines = [];

  // console.log('path', path, 'node', node);

  const methods = Object.keys(node);

  methods.forEach((method) => {
    const pathParams = jsonpath
      .query(node[method], '$..parameters[*]')
      .filter((p) => p.in === 'path');

    const queryParams = jsonpath
      .query(node[method], '$..parameters[*]')
      .filter((p) => p.in === 'query');

    const requestBody = ['post', 'put', 'patch'].includes(method)
      ? jsonpath.query(node[method], '$..requestBody.content')[0]
      : '';

    const requestContentType = requestBody
      ? Object.keys(requestBody).includes('application/json')
        ? null
        : Object.keys(requestBody)[0]
      : null;

    const requestContent = requestContentType
      ? requestBody[requestContentType].schema.type === 'string'
        ? 'JSON.stringify(payload)'
        : 'payload'
      : '';

    const requestConfig = requestContentType
      ? {
          headers: {
            'Content-Type': requestContentType,
          },
        }
      : '';

    const paramDocs = pathParams
      .map(
        (p) =>
          `     * @param ${p.name}  ${convertDataType(p.schema)} ${
            p.required ? ' **REQUIRED** ' : 'optional'
          }, in path. ${p.description}`,
      )
      .concat(
        queryParams.map(
          (p) =>
            `     * @param ${p.name}  *${convertDataType(p.schema)}*${
              p.required ? ' **REQUIRED** ' : 'optional'
            }, in query. ${p.description}`,
        ),
      )
      .join('\n');

    const params = pathParams
      .map((p) => `${p.name}: ${convertDataType(p.schema)}`)
      .concat(queryParams.map((p) => `${p.name}: ${convertDataType(p.schema)}`))
      .join(', ');
    // const paramNames = pathParams.map((p) => p.name).join(', ');

    const urlSearchParams = [];
    queryParams.forEach((p) => {
      urlSearchParams.push(`${p.name}=\${${p.name}}`);
    });

    const operationId = node[method].operationId;
    const isResponseTypeArray =
      jsonpath.query(
        node[method],
        '$..responses[200].content[*].schema.type',
      )[0] === 'array';

    const queryString =
      urlSearchParams.length > 0 ? `?${urlSearchParams.join('&')}` : '';

    let resultType = `I${toPascalCase(tag)}Model`;

    const resRefs = new Set();
    const refs = jsonpath.query(node[method], '$..responses..["$ref"]') || [];
    
    refs.forEach((ref) => {
      const refName = ref.substring(ref.lastIndexOf('/') + 1);
      if (refName !== 'Error') {
        resRefs.add(refName);
      }
    });

    if (resRefs.size > 0) {
      resultType = `I${resRefs.values().next().value}Model`;
    } else {
      resultType = 'any'; 
    }

    codeLines.push(`
  /**
   * ${node[method].summary}
   * ${node[method].description}
${paramDocs}
    * @returns
    */
  async ${operationId}( ${params} ${requestContent ? ', payload: any' : ''} ) {
    return this.${method}${
      method === 'get' ? (isResponseTypeArray ? 'All' : 'One') : ''
    }<${resultType}>(
      \`${path.replaceAll('{', '${')}${queryString}\`
      ${requestContent ? `, payload` : ''}
      ${requestConfig ? `, ${JSON.stringify(requestConfig)}` : ''}
    );
  }
    `);
  });

  return codeLines.join('\n');
}

module.exports = {
  generateApis,
};
