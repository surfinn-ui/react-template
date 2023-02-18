const series = require('async').series;
const { exec } = require('child_process');
const jsonpath = require('jsonpath');
const fs = require('fs');

const {
  convertDataType,
  isResponseTypeArray,
  returnType,
  toCamelCase,
  toPascalCase,
  format,
  getTagNames,
  getPaths,
  getSchemasFromComponents,
} = require('./utils');

/**
 * generate service apis
 *
 * @param {*} api
 * @param {*} cb
 */
async function generateApis(api, cb) {
  const generators = [];

  // Create API documents with each tag
  getTagNames(api).forEach((tag) => {
    generators.push((cb) => {
      try {
        exec(`cd ../ && yarn gen "api" "${tag}"`, cb);
      } catch (e) {
        console.log('ERROR', e);
      }
    });
  });

  const paths = getPaths(api);

  // Add import statements for the referenced model in each api.
  paths.forEach((node) => {
    const object = node.value;
    const tag = jsonpath.query(object, '$..tags[0]')[0];
    const imports = new Set();
    jsonpath
      .query(object, '$..responses..["$ref"]')
      .map((ref) => ref.substring(ref.lastIndexOf('/') + 1))
      .forEach((ref) => {
        imports.add(
          `import { I${ref}Model } from '../../models/${ref}.model';`,
        );
      });
    generators.push((cb) => addImportsToApi(tag, [...imports], cb));
  });

  // Add the api method for each path to the document created with the first tag of api
  paths.forEach((node) => {
    const path = node.path.pop();
    const object = node.value;
    const tag = jsonpath.query(object, '$..tags[0]')[0];
    generators.push((cb) => {
      try {
        addMethodToApi(tag, path, object, cb);
      } catch (e) {
        console.log('ERROR', e);
      }
    });
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

  const methods = Object.keys(node);

  methods.forEach((method) => {
    const operationId = node[method].operationId;

    const { docs, params } = translateParameters(node[method]);

    const queryParams = jsonpath
      .query(node[method], '$..parameters[*]')
      .filter((p) => p.in === 'query');

    const urlSearchParams = [];
    queryParams.forEach((p) => {
      urlSearchParams.push(`${p.name}=\${${p.name}}`);
    });
    const queryString =
      urlSearchParams.length > 0 ? `?${urlSearchParams.join('&')}` : '';

    const url = `\${this.url}${path
      .replace(new RegExp(`^/${tag}`), '')
      .replaceAll('{', '${')}${queryString}`;

    const {
      docs: requestBodyDocs,
      params: requestBodyParams,
      requestBody,
      requestConfig,
    } = translateRequestBody(node, method);

    const baseApiName = getBaseApiName(node, method);

    let resultType = returnType(node, method); // || `I${toPascalCase(tag)}Model`;
    codeLines.push(`
  /**
   * ## ${node[method].summary}
   * ${node[method].description}
${
  docs || requestBodyDocs
    ? `${docs}${docs && requestBodyDocs && '\n'}${requestBodyDocs}`
    : '   *'
}
   * @returns
   */
  async ${operationId}( ${[]
      .concat(params.path, params.query, requestBodyParams)
      .sort((a, b) => {
        const ao = a.isOptional ? 1 : 0;
        const bo = b.isOptional ? 1 : 0;
        return ao - bo;
      })
      .map((p) => `${p.name}${p.isOptional}: ${p.type}`)
      .join(', ')}) {
    return this.${baseApiName}${resultType ? `<${resultType}>` : ''}(
      \`${url}\`
      ${requestBody ? `, payload` : ''}
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


function getBaseApiName(node, method) {
  const name = method;
  if (method === 'get') {
    return isResponseTypeArray(node, method) ? 'getAll' : 'getOne';
  }

  return toCamelCase(name);
}

function translateParameters(node) {
  const parameters = jsonpath.query(node, '$..parameters[*]');

  const headerParams = translateHeaderParameters(
    parameters.filter((p) => p.in === 'header'),
  );
  const pathParams = translatePathParameters(
    parameters.filter((p) => p.in === 'path'),
  );
  const queryParams = translateQueryParameters(
    parameters.filter((p) => p.in === 'query'),
  );

  return {
    docs: []
      .concat(headerParams.docs, pathParams.docs, queryParams.docs)
      .join('\n'),
    params: {
      header: headerParams.params,
      path: pathParams.params,
      query: queryParams.params,
    },
  };
}

function translateParam(param, placement) {
  const info = [];
  const name = param.name;
  const type = convertDataType(param.schema);
  const format = param.schema.format;
  const isOptional = param.required ? '' : '?';
  const required = param.required ? '**(REQUIRED)**' : '';
  const description = param.description || '';
  info.push(
    `   * @param {${type}} ${param.required ? name : `[${name}]`} ${required} ${
      format ? `{${format}} ` : ''
    }${description}`,
  );
  param = { name, type, isOptional, format };
  return {
    info: info.join('\n'),
    param,
  };
}

function translateHeaderParameters(parameters) {
  const docs = [];
  const params = [];
  if (parameters) {
    parameters.forEach((p) => {
      const { info, param } = translateParam(p, 'header');
      docs.push(info);
      params.push(param);
    });
  }
  return { docs, params };
}

function translatePathParameters(parameters) {
  const docs = [];
  const params = [];
  if (parameters) {
    parameters.forEach((p) => {
      const { info, param } = translateParam(p, 'param');
      docs.push(info);
      params.push(param);
    });
  }
  return { docs, params };
}

function translateQueryParameters(parameters) {
  const docs = [];
  const params = [];
  if (parameters) {
    parameters.forEach((p) => {
      const { info, param } = translateParam(p, 'query');
      docs.push(info);
      params.push(param);
    });
  }
  return { docs, params };
}

function translateRequestBody(node, method) {
  const hasRequestBody =
    ['post', 'put', 'patch'].includes(method) && node[method].requestBody;

  const requestBody = hasRequestBody
    ? jsonpath.query(node[method], '$..requestBody.content')[0]
    : '';

  const contentType = requestBody
    ? Object.keys(requestBody).includes('application/json')
      ? 'application/json'
      : Object.keys(requestBody)[0]
    : null;

  const content = contentType
    ? requestBody[contentType].schema.type === 'string'
      ? 'JSON.stringify(payload)'
      : 'payload'
    : undefined;

  const requestConfig =
    contentType && contentType !== 'application/json' && content !== ''
      ? {
          headers: {
            'Content-Type': contentType,
          },
        }
      : '';

  const type = contentType
    ? convertDataType(requestBody[contentType].schema)
    : 'any';
  const format = contentType ? requestBody[contentType].schema.format : '';

  const docs = hasRequestBody
    ? `   * @param {${type || '*'}} payload **(REQUIRED)** ${
        format ? `{${format}}` : ''
      }`
    : '';
  const params = hasRequestBody
    ? [
        {
          name: 'payload',
          isOptional: '',
          type,
          format,
        },
      ]
    : [];
  // console.log('*** *** *** ***', method, node[method].operationId, params);
  return {
    docs,
    params,
    requestBody: content,
    requestConfig,
  };
}
