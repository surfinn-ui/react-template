const series = require('async').series;
const { exec } = require('child_process');
const jsonpath = require('jsonpath');
const fs = require('fs');

const {
  getServers,
  getTags,
  getPaths,
  getOperationIds,
  getTagNames,

  getComponentBy$ref,

  getParametersByPathAndMethod,
  getResponsesByPathAndMethod,
  getRequestBodyByPathAndMethod,

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
} = require('./utils');

/**
 * Generate Service Apis
 *
 * @param {*} document
 * @param {*} callback
 */
async function generateApis(callback) {
  const generators = [];
  console.log('Start generateApis()');
  // Create API documents with each tag
  getTagNames().forEach((tagName) => {
    if (
      !fs.existsSync(
        `./src/services/api/${toCamelCase(tagName)}/${toPascalCase(
          tagName,
        )}Api.ts`,
      )
    ) {
      generators.push((callback) => {
        console.log(
          'Since the api does not exist, we create a api named :',
          toPascalCase(tagName),
        );
        try {
          exec(`yarn gen "api" "${toPascalCase(tagName)}"`, callback);
        } catch (e) {
          console.log('ERROR', e);
          callback();
        }
      });
    }
  });

  // Clear the generated api files
  getTagNames().forEach((tagName) => {
    generators.push((callback) => {
      clearApiFile(tagName, callback);
    });
  });

  const paths = getPaths();

  // Add import statements for the referenced model in each api.
  paths.forEach((node) => {
    const object = node.value;
    const tag = jsonpath.query(object, '$..tags[0]')[0];
    const imports = new Set();
    jsonpath
      .query(object, '$..["$ref"]')
      .map((ref) => ref.substring(ref.lastIndexOf('/') + 1))
      .forEach((ref) => {
        imports.add(
          `import { I${toPascalCase(
            ref,
          )}Model } from '../../../models/${toCamelCase(ref)}/${toPascalCase(
            ref,
          )}Model';`,
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
        callback();
      }
    });
  });

  series(generators, callback);
}

/**
 *
 * @param {*} name
 * @returns
 */
function getApiFilePath(name) {
  return `./src/services/api/${toCamelCase(name)}/${toPascalCase(
    name,
  )}ApiCore.ts`;
}

/**
 *
 * @param {*} name
 * @param {*} callback
 */
function clearApiFile(name, callback) {
  const filepath = getApiFilePath(name);
  fs.readFile(filepath, 'utf8', (err, file) => {
    if (err) {
      console.log(err);
      callback();
    } else {
      let codeLines = [];
      codeLines = file.toString().split('\n');

      const startIndex = codeLines.findLastIndex((line) =>
        line.endsWith(`// ^ Apis generated by openapi-generator`),
      );

      const endIndex = codeLines.findIndex((line) =>
        line.endsWith(`// $ Apis generated by openapi-generator`),
      );

      codeLines.splice(startIndex + 1, endIndex - startIndex - 1);
      fs.writeFile(filepath, codeLines.join('\n'), () => {
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
  const filepath = getApiFilePath(name);
  addImports(filepath, imports, callback);
}

/**
 *
 * @param {*} tag
 * @param {*} path
 * @param {*} node
 * @param {*} callback
 */
function addMethodToApi(tag, path, node, callback) {
  const filepath = getApiFilePath(tag);

  let codeLines = [];

  fs.readFile(filepath, 'utf8', (err, file) => {
    if (err) {
      console.log(err);
      callback();
    } else {
      codeLines = file.toString().split('\n');
      const startIndex = codeLines.findIndex((line) =>
        line.endsWith(`// ^ Apis generated by openapi-generator`),
      );

      // add api codes

      const apiCode = getApiCode(tag, path, node);
      codeLines.splice(startIndex + 1, 0, apiCode);
      fs.writeFile(filepath, codeLines.join('\n'), () => {
        // console.log('write', filepath);
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
    const operationId = toCamelCase(node[method].operationId);

    const { docs, params } = translateParameters(node[method]);
    const url = `${path.replaceAll('{', '${')}`;

    const {
      docs: requestBodyDocs,
      params: requestBodyParams,
      requestBody,
      requestConfig,
    } = translateRequestBody(node, method);
    // requestBodyDocs && console.log('API requestBodyDocs', node[method].operationId, requestBodyDocs)
    const apiBaseMethodName = getApiBaseMethodName(node, method);

    let resultType = returnType(node, method);
    codeLines.push(`
  /**
   * ## ${node[method].summary}
   * ${node[method].description}
   * 
${
  docs || requestBodyDocs
    ? `${docs}${docs && requestBodyDocs && '\n'}${requestBodyDocs}`
    : '   *'
}
   * @returns
   */
  public async ${operationId}( ${[]
      .concat(params.header, params.path, params.query, requestBodyParams)
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
            `if(${p.name}) queries.append('${p.name}', ${p.type !== 'string' ? String(p.name) : p.name}${
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

/**
 *
 * @param {*} node
 * @param {*} method
 * @returns
 */
function getApiBaseMethodName(node, method) {
  const name = method;
  if (method === 'get') {
    return isResponseTypeArray(node, method) ? 'search' : 'find';
  } else if (method === 'post') {
    return 'create';
  } else if (method === 'put') {
    return 'update';
  } else if (method === 'patch') {
    return 'partial';
  } else if (method === 'delete') {
    return 'delete';
  }

  return toCamelCase(name);
}

/**
 *
 * @param {*} node
 * @returns
 */
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

/**
 *
 * @param {*} param
 * @param {*} placement
 * @returns
 */
function translateParam(param, placement) {
  // placement === 'header' && console.log('header.param', param);
  // placement === 'path' &&  console.log('path.param', param)
  // placement === 'query' &&  console.log('query.param', param)
  if (param.schema.$ref) {
    // console.log('param', param);
    // console.log('param.schema.$ref', param.schema.$ref);
    
    const ref = getComponentBy$ref(param.schema.$ref);
    // console.log('param.schema.$ref', ref);
    
    const name = param.name;
    const type = convertDataType(ref.schema);
    const format = null;
    const nullable = param.required ? '' : '?';
    const required = param.required ? '**(REQUIRED)**' : '';
    const defaultValue = param?.default || ref.default || '';
    const description = param.description || '';

    const info = `   * @param {${type}} ${
      param.required ? name : `[${name}]`
    } ${required} ${format ? `{${format}} ` : ''}${description}`;
    
    const paramInfo = { name, type, nullable, format, default: defaultValue };
    
    return {
      info: info,
      param: paramInfo,
    };
  } else {
    const name = param.name;
    const type = convertDataType(param.schema);
    const format = param.schema?.format;
    const nullable = param.required ? '' : '?';
    const required = param.required ? '**(REQUIRED)**' : '';
    const description = param.description || '';
    const defaultValue = param.default || '';
    const info = `   * @param {${type}} ${
      param.required ? name : `[${name}]`
    } ${required} ${format ? `{${format}} ` : ''}${description}`;
    const paramInfo = { name, type, nullable, format, default: defaultValue };

    return {
      info: info,
      param: paramInfo,
    };
  }
}

/**
 *
 * @param {*} parameters
 * @returns
 */
function translateHeaderParameters(parameters) {
  const docs = [];
  const params = [];
  if (parameters) {
    parameters.forEach((p) => {
      const { info, param } = translateParam(p, 'header');
      docs.push(info);
      params.push(param);
    });
    // console.log('headers ', params)
  }
  return { docs, params };
}

/**
 *
 * @param {*} parameters
 * @returns
 */
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

/**
 *
 * @param {*} parameters
 * @returns
 */
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

/**
 *
 * @param {*} node
 * @param {*} method
 * @returns
 */
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
  const description = node[method].requestBody?.description || '';
  const docs = hasRequestBody
    ? `   * @param {${type || '*'}} payload **(REQUIRED)** ${
        format ? `{${format}}` : ''
      }  ${description ? description : ''}`
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
