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
 * @param {*} document
 * @param {*} callback
 */
async function generateApis(document, callback) {
  const generators = [];

  // Create API documents with each tag
  getTagNames(document).forEach((tag) => {
    if (
      !fs.existsSync(`../src/services/api/${toCamelCase(tag)}/${tag}Api.ts`)
    ) {
      generators.push((callback) => {
        try {
          exec(`cd ../ && yarn gen "api" "${tag}"`, callback);
        } catch (e) {
          console.log('ERROR', e);
        }
      });
    }
  });

  // Clear the generated api files
  getTagNames(document).forEach((tagName) => {
    generators.push((callback) => {
      clearFile(tagName, callback);
    });
  });

  const paths = getPaths(document);

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
          `import { I${ref}Model } from '../../../models/${toCamelCase(
            ref,
          )}/${toPascalCase(ref)}Model';`,
        );
      });
    generators.push((callback) => addImportsToApi(tag, [...imports], callback));
  });

  // Add the api method for each path to the document created with the first tag of api
  paths.forEach((node) => {
    const path = node.path.pop();
    const object = node.value;
    const tag = jsonpath.query(object, '$..tags[0]')[0];
    generators.push((callback) => {
      try {
        addMethodToApi(tag, path, object, callback);
      } catch (e) {
        console.log('ERROR', e);
      }
    });
  });

  series(generators, callback);
}

function clearFile(name, callback) {
  const filepath = `../src/services/api/${toCamelCase(name)}/${toPascalCase(
    name,
  )}ApiGenerated.ts`;
  fs.readFile(filepath, 'utf8', (err, file) => {
    if (err) {
      console.log(err);
    } else {
      let codeLines = [];
      codeLines = file.toString().split('\n');
      const index = codeLines.findLastIndex((line) =>
        line.endsWith(`extends ApiBase {`),
      );
      codeLines.splice(index + 1, codeLines.length - index - 1);
      codeLines.push('}');
      fs.writeFile(filepath, codeLines.join('\n'), () => {
        console.log('write', filepath);
        callback();
      });
    }
  });
}

/**
 *
 * @param {*} name
 * @param {*} imports
 * @param {*} callback
 */
function addImportsToApi(name, imports, callback) {
  const filepath = `../src/services/api/${toCamelCase(name)}/${toPascalCase(
    name,
  )}ApiGenerated.ts`;
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
        console.log('write', filepath);
        callback();
      });
    }
  });
}

/**
 *
 * @param {*} tag
 * @param {*} path
 * @param {*} node
 * @param {*} callback
 */
function addMethodToApi(tag, path, node, callback) {
  const filepath = `../src/services/api/${toCamelCase(tag)}/${toPascalCase(
    tag,
  )}ApiGenerated.ts`;

  let codeLines = [];

  fs.readFile(filepath, 'utf8', (err, file) => {
    if (err) {
      console.log(err);
    } else {
      codeLines = file.toString().split('\n');
      const startIndex = codeLines.findIndex((line) =>
        line.endsWith(`extends ApiBase {`),
      );

      // add api codes

      const apiCode = getApiCode(tag, path, node);
      codeLines.splice(startIndex + 1, 0, apiCode);
      fs.writeFile(filepath, codeLines.join('\n'), () => {
        console.log('write', filepath);
        callback();
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

    const url = `${path.replaceAll('{', '${')}`;

    const {
      docs: requestBodyDocs,
      params: requestBodyParams,
      requestBody,
      requestConfig,
    } = translateRequestBody(node, method);

    const apiBaseMethodName = getApiBaseMethodName(node, method);

    let resultType = returnType(node, method);
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
  public async ${operationId}( ${[]
      .concat(params.path, params.query, requestBodyParams)
      .sort((a, b) => {
        const ao = a.nullable === '?' ? 1 : 0;
        const bo = b.nullable === '?' ? 1 : 0;
        return ao - bo;
      })
      .map((p) => `${p.name}${p.nullable}: ${p.type}`)
      .join(', ')}) {
    ${`
      ${params.query.length ? 'const queries = new URLSearchParams();' : ''}
      ${params.query
        .map(
          (p) =>
            `if(${p.name}) queries.append('${p.name}', ${p.name}${
              p.type.endsWith('[]') ? `.join(','))` : ')'
            };`,
        )
        .join('\n')} `}

    return this.${apiBaseMethodName}${resultType ? `<${resultType}>` : ''}(
      \`${url}${
      (method === 'post' || method === 'put' || method === 'patch') &&
      params.query.length
        ? '?${queries.toString()}'
        : ''
    }\`${
      (method === 'get' ||
        method === 'delete' ||
        method === 'option' ||
        method === 'header') &&
      params.query.length
        ? `, queries`
        : ''
    }${
      (method === 'post' || method === 'put' || method === 'patch') &&
      requestBody
        ? `, payload`
        : ''
    }${requestConfig ? `, ${JSON.stringify(requestConfig)}` : ''}
    );
  }`);
  });

  return codeLines.join('\n');
}

module.exports = {
  generateApis,
};

function getApiBaseMethodName(node, method) {
  const name = method;
  if (method === 'get') {
    return isResponseTypeArray(node, method) ? 'search' : 'find';
  } else if (method === 'post') {
    return 'create';
  } else if (method === 'put') {
    return 'update';
  } else if (method === 'patch') {
    return 'partialUpdate';
  } else if (method === 'delete') {
    return 'delete';
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
  const nullable = param.required ? '' : '?';
  const required = param.required ? '**(REQUIRED)**' : '';
  const description = param.description || '';
  info.push(
    `   * @param {${type}} ${param.required ? name : `[${name}]`} ${required} ${
      format ? `{${format}} ` : ''
    }${description}`,
  );
  param = { name, type, nullable, format };
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
          nullable: '',
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
