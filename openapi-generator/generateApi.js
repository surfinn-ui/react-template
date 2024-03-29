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
  parseMediaType,
  parseReference,
  parseRequestBody,
  // ----------------------------------

  convertDataType,
  isResponseTypeArray,
  returnType,

  format,
  getSchemasFromComponents,

  addImports,

  toCamelCase,
  toPascalCase,
  toParagraphCase,
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
  // console.log('Start generateApis()');
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
      .map((ref) => ref.substring(ref.lastIndexOf('/') + 1).replace(/^successResponse(list)?/i, ''))
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

    const { docs, params } = parseParameters(node[method]);
    const url = `${path.replaceAll('{', '${')}`;

    const {
      docs: requestBodyDocs,
      params: requestBodyParams,
      requestBody,
      requestConfig,
    } = parseRequestBodyForApi(path, method);
    // requestBodyDocs && console.log('API requestBodyDocs', node[method].operationId, requestBodyDocs)
    const apiBaseMethodName = getApiBaseMethodName(node, method);

    let responseModel = returnType(node, method);
    // console.log(responseModel);
    codeLines.push(`
  /**
   * ## ${node[method].summary || toParagraphCase(node[method].operationId)}
   * ${node[method].description || ''}
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
            `if (${p.name}) {${
              p.props
                ? Object.keys(p.props)
                    .filter((k) => p.props[k].writeOnly !== true)
                    .map(
                      (k) =>
                        `if (${p.name}.${k}) { queries.append('${k}', String(${p.name}.${k})); }`,
                    )
                    .join('\n')
                : `
                  queries.append('${p.name}', ${`
                    ${
                      p.type.endsWith('[]')
                        ? `${p.name}.join(',')`
                        : `String(${p.name})`
                    } 
                  )`};
                  `
            }
            }`,
        )
        .join('\n')} `}

    return this.${apiBaseMethodName}${responseModel ? `<${responseModel}>` : ''}(
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
function parseParameters(node) {
  const parameters = jsonpath.query(node, '$..parameters[*]');

  const headerParams = parseHeaderParameters(
    parameters.filter((p) => p.in === 'header'),
  );
  const pathParams = parsePathParameters(
    parameters.filter((p) => p.in === 'path'),
  );
  const queryParams = parseQueryParameters(
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
function parseParam(param, placement) {
  // placement === 'header' && console.log('header.param', param);
  // placement === 'path' && console.log('path.param', param);
  // placement === 'query' &&  console.log('query.param', param)
  if (param.schema?.$ref) {
    // console.log('param', param);
    // console.log('param.schema.$ref', param.schema.$ref);

    const name = param.name;
    const type = convertDataType(param.schema);

    const ref = getComponentBy$ref(param.schema.$ref);
    // console.log('param.schema.$ref', ref, param.schema);

    const format = null;
    const nullable = param.required ? '' : '?';
    const required = param.required ? '**(REQUIRED)**' : '';
    const defaultValue = param?.default || ref.default || '';
    const description = param.description || '';
    const props = ref.type === 'object' ? ref.properties : null;

    const info = `   * @param {${type}} ${
      param.required ? name : `[${name}]`
    } ${required} ${format ? `{${format}} ` : ''}${description}`;

    const paramInfo = {
      name,
      type,
      nullable,
      format,
      default: defaultValue,
      props,
    };

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
    const props = null;
    const paramInfo = {
      name,
      type,
      nullable,
      format,
      default: defaultValue,
      props,
    };

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
function parseHeaderParameters(parameters) {
  const docs = [];
  const params = [];
  if (parameters) {
    parameters.forEach((p) => {
      const { info, param } = parseParam(p, 'header');
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
function parsePathParameters(parameters) {
  const docs = [];
  const params = [];
  if (parameters) {
    parameters.forEach((p) => {
      const { info, param } = parseParam(p, 'param');
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
function parseQueryParameters(parameters) {
  const docs = [];
  const params = [];
  if (parameters) {
    parameters.forEach((p) => {
      const { info, param } = parseParam(p, 'query');
      docs.push(info);
      params.push(param);
    });
  }
  return { docs, params };
}

/**
 * Request Body
 *
 * Request Body Object | Reference Object
 *
 * The request body applicable for this operation.
 * The requestBody is fully supported in HTTP methods where the HTTP 1.1 specification RFC7231
 * has explicitly defined semantics for request bodies. In other cases where the HTTP spec is vague
 * (such as GET, HEAD and DELETE), requestBody is permitted but does not have well-defined semantics
 * and SHOULD be avoided if possible.
 * @param {*} path
 * @param {*} method
 * @returns
 */
function parseRequestBodyForApi(path, method) {
  const hasRequestBody = ['post', 'put', 'patch'].includes(method);

  const requestBody = hasRequestBody
    ? getRequestBodyByPathAndMethod(path, method)
    : undefined;

  if (!requestBody) {
    return {
      docs: '',
      params: [],
      requestBody: '',
      requestConfig: '',
    };
  }

  // Has Reference Object
  // #/components/requestBodies/ 에 정의된 객체를 참조한다.
  // 따라서, Request Body Object의 형을 갖추어야 한다.
  // 파싱은 Reference Object를 파싱하는 함수를 사용한다.
  if (requestBody.$ref) {
    const { type, $refObject, summary, description } =
      parseReferenceObject(requestBody);

    // const obj = parseRequestBody(jsonpath.query(document, path));
    // console.log(path, method, 'Request Body $ref', JSON.stringify(obj, null, 2));

    const docs = hasRequestBody
      ? `   * @param {${type || '*'}} payload **(REQUIRED)** ${
          summary ? `${summary}\n   *         ` : ''
        }${description ? `- ${description}` : ''}`
      : '';
    const params = hasRequestBody ? [ref] : [];
    const requestConfig = '';
    return {
      docs,
      params,
      requestBody: 'payload',
      requestConfig,
    };
  }

  // Has Request Body Object
  // console.log('request body object', JSON.stringify(jsonpath.query(document, `$.paths['${path}']['${method}'].requestBody`)[0], null, 2))
  const { required, contentType, content } = parseRequestBody(
    jsonpath.query(document, `$.paths['${path}']['${method}'].requestBody`)[0],
  );
  // console.log(path, method, 'Request Body Object', JSON.stringify(requestBody, null, 2))
  // console.log(
  //   'Parsed Request Body Object\n',
  //   performance.now(),
  //   '\n',
  //   path,
  //   '\n',
  //   method,
  //   '\n----------------------------------------------\n',
  //   JSON.stringify({ required, contentType, content }, null, 2),
  //   '\n----------------------------------------------\n',
  // );

  const description = requestBody.description;

  const requestConfig =
    contentType && contentType !== 'application/json'
      ? {
          headers: {
            'Content-Type': contentType,
          },
        }
      : '';

  const type =
    content.schema.type === 'string'
      ? 'string'
      : content.schema.type === 'integer'
      ? 'number'
      : content.schema.type === 'number'
      ? 'number'
      : content.schema.type === 'object'
      ? content.schema.additionalProperties
        ? content.schema.additionalProperties.$ref
          ? `Record<string, I${toPascalCase(
              content.schema.additionalProperties.$ref.split('/').pop(),
            )}Model>`
          : `Record<string, ${content.schema.additionalProperties.type}>`
        : `I${content.schema.$refModel}Model`
      : content.schema.type === 'array'
      ? `Array<I${content.schema.items.$refModel}Model>`
      : content.schema.type === 'boolean'
      ? 'boolean'
      : 'any';
  const format = contentType ? requestBody.content.schema?.format : '';
  const docs = `   * @param {${type || '*'}} payload ${
    required ? '**(REQUIRED)** ' : ''
  }${format ? `{${format}}` : ''} ${description ? description : ''}`;
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

  return {
    docs,
    params,
    requestBody: content,
    requestConfig,
  };
}
