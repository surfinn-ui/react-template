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
 * Generate Stores
 *
 * @param {*} callback
 */
function generateStores(callback) {
  const tagNames = getTagNames();
  const generators = [];
  tagNames.forEach((tagName) => {
    if (fs.existsSync(getStoreFilePath(tagName))) {
      // console.log('Store already exists', tagName);
    } else {
      generators.push((callback) => {
        console.log(
          'Since the store does not exist, we create a store named: ',
          tagName,
        );
        try {
          exec(`yarn gen "store" "${tagName}"`, callback);
        } catch (e) {
          console.log('ERROR', e);
          callback();
        }
      });
    }
  });

  // Clear generated actions
  tagNames.forEach((tagName) => {
    generators.push((callback) => {
      // console.log('CLEAR Store ', tagName);
      clearStoreFile(tagName, callback);
    });
  });

  // Add imports to the store
  tagNames.forEach((tagName) => {
    const imports = new Set();

    getPathsByTag(document, tagName).forEach((node) => {
      const object = node.value;
      jsonpath
        .query(object, '$..responses..["$ref"]')
        .map((ref) => ref.substring(ref.lastIndexOf('/') + 1))
        .forEach((ref) => {
          imports.add(
            `import { I${toPascalCase(ref)}Model } from '../${toCamelCase(
              ref,
            )}/${toPascalCase(ref)}Model';`,
          );
        });
      generators.push((callback) =>
        addImportsToStore(tagName, [...imports], callback),
      );
    });
  });

  // TODO - Add props to the store

  // Add generated actions
  tagNames.forEach((tagName) => {
    getPathsByTag(document, tagName).forEach((node) => {
      const path = node.path.pop();
      const object = node.value;
      generators.push((callback) => {
        try {
          addActionsToStore(tagName, path, object, callback);
        } catch (e) {
          console.log('ERROR', e);
          callback();
        }
      });
    });
  });

  // Add exposes generated actions
  tagNames.forEach((tagName) => {
    getPathsByTag(document, tagName).forEach((node) => {
      const path = node.path.pop();
      const object = node.value;
      generators.push((callback) => {
        try {
          exposeActionsToStore(tagName, path, object, callback);
        } catch (e) {
          console.log('ERROR', e);
          callback();
        }
      });
    });
  });

  series(generators, callback);
}

module.exports = {
  generateStores,
};

/**
 *
 * @param {*} tagName
 * @returns
 */
function getStoreFilePath(tagName) {
  return `./src/models/${toCamelCase(tagName)}/${toPascalCase(
    tagName,
  )}Store.ts`;
}

/**
 *
 * @param {*} tagName
 * @param {*} callback
 */
function clearStoreFile(tagName, callback) {
  const filepath = getStoreFilePath(tagName);
  fs.readFile(filepath, 'utf8', (err, file) => {
    if (err) {
      callback();
    } else {
      let codeLines = [];
      codeLines = file.toString().split('\n');

      // remove actions
      let startIndex = codeLines.findLastIndex((line) =>
        line.endsWith(`// ^ Actions generated by openapi-generator`),
      );
      let endIndex = codeLines.findLastIndex((line) =>
        line.endsWith(`// $ Actions generated by openapi-generator`),
      );
      codeLines.splice(startIndex + 1, endIndex - startIndex - 1);

      // remove expose actions
      startIndex = codeLines.findLastIndex((line) =>
        line.endsWith(`// ^ Expose actions generated by openapi-generator`),
      );
      endIndex = codeLines.findLastIndex((line) =>
        line.endsWith(`// $ Expose actions generated by openapi-generator`),
      );
      codeLines.splice(startIndex + 1, endIndex - startIndex - 1);

      fs.writeFile(filepath, codeLines.join('\n'), () => {
        // console.log('write', filepath);
        callback();
      });
    }
  });
}

/**
 *
 * @param {*} api
 * @param {*} tag
 * @returns
 */
function getPathsByTag(api, tag) {
  return getPaths(api).filter((node) => {
    const object = node.value;
    return jsonpath.query(object, '$..tags[0]')[0] === tag;
  });
}

/**
 *
 * @param {*} tag
 * @param {*} imports
 * @param {*} callback
 */
function addImportsToStore(tag, imports, callback) {
  const filepath = getStoreFilePath(tag);
  // console.log('addImportsToStore', filepath, imports);
  addImports(filepath, imports, callback);
}

/**
 *
 * @param {*} tagName
 * @param {*} path
 * @param {*} object
 * @param {*} callback
 */
function addActionsToStore(tagName, path, object, callback) {
  const filepath = getStoreFilePath(tagName);

  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      callback();
      return;
    }

    let codeLines = data.split('\n');

    const startIndex = codeLines.findIndex((line) =>
      line.includes('// ^ Actions generated by openapi-generator'),
    );

    codeLines.splice(startIndex + 1, 0, getActionCodes(path, object));

    fs.writeFile(filepath, codeLines.join('\n'), () => {
      // console.log('write', filepath);
      callback();
    });
  });
}

/**
 *
 * @param {*} path
 * @param {*} object
 * @returns
 */
function getActionCodes(path, object) {
  return Object.keys(object)
    .map((method) => {
      // console.log('getActionCodes', path, method, object);
      const pathInfo = object[method];
      const operationId = toCamelCase(object[method].operationId);

      const parameters = parseParameters(pathInfo.parameters);
      // const options = parseOptions(pathInfo);
      const requestBody = parseRequestBody(pathInfo.requestBody);
      const responses = parseResponses(pathInfo.responses);

      const resultType = returnType(object, method);

      return `
    /**
     * ## ${pathInfo.summary}
     * ${pathInfo.description}
     * @tags ${pathInfo.tags ? `\`${pathInfo.tags.join(', ')}\`` : ''}
     * ${[].concat(parameters.paramDocs, requestBody.docs).join('\n     * ')}
     */
    const ${operationId} = flow(function* (${parameters.paramArgs
        .concat(requestBody.payload)
        .map((i) => i.join(': '))
        .join(', ')} 
    ) {
      if(self.isPending) return;
      self.pending();
      const response = yield ${toCamelCase(
        pathInfo.tags[0],
      )}Api.${operationId}(${[]
        .concat(parameters.paramArgs, requestBody.payload)
        .map((i) => i[0])
        .join(', ')});
      if (response.kind === 'ok') {
        // TODO - TRANSLATE RESPONSE TO STORE
        const data = response.data.data as ${resultType};
        const pagination = response.data.pagination as IPagination;

        self.done();
        return data;
      } else {
        self.error(response);
        console.error(response.kind);
      }
    });`;
    })
    .join('\n\n');
}

/**
 *
 * @param {*} params
 * @returns
 */
function parseParameters(params) {
  const paramDocs = [];
  const paramArgs = [];
  // console.log('parseParameters()', params);
  params &&
    params
      .filter((p) => p.in === 'path' || p.in === 'query')
      .forEach((p) => {
        const name = toCamelCase(p.name);
        const type = convertDataType(p.schema);
        const format = p.schema?.format ? `(${p.schema.format})` : '';
        const required = p.required ? '**REQUIRED**' : '';
        const description = p.description || '';
        paramDocs.push(
          `@param {${type}} ${name} ${required} ${format} ${description}`,
        );
        if (p.in === 'path' || p.in === 'query') {
          paramArgs.push([`${name}`, `${type}`]);
        }
      });

  return {
    paramDocs,
    paramArgs,
  };
}

/**
 *
 *
 * @param {*} requestBody
 * @returns
 */
// TODO: implement
function parseRequestBody(requestBody) {
  const docs = [];
  const payload = [];
  if (requestBody) {
    const required = requestBody.required ? '**REQUIRED**' : '';
    const description = requestBody.description || '';

    const contentType = Object.keys(requestBody).includes('application/json')
      ? 'application/json'
      : Object.keys(requestBody.content)[0];

    // const type = contentType
    //   ? convertDataType(requestBody.content[contentType].schema)
    //   : 'any';
    // const format = `{${type}}`;
    const type = 'any';
    const format = `{any}`;

    docs.push(
      ['@param', `{${type}}`, 'payload', required, format, description].join(
        ' ',
      ),
    );
    payload.push(['payload', type]);
  }
  return {
    docs,
    payload,
  };
}

/**
 *
 *
 * @param {*} responses
 * @returns
 */
function parseResponses(responses) {
  const dataDocs = [];
  // const dataTypes = new Set();

  if (responses['200']) {
    jsonpath.query(responses['200'], '$..schema').forEach((schema) => {
      if (schema['$ref']) {
        const type = schema['$ref'].split('/').pop();
        dataDocs.push(`@returns {${type}}`);
        // dataTypes.add(type);
      }
    });
    // console.log('parseResponse()', JSON.stringify(responses, null, 2), Array.from(dataTypes), dataDocs);
  }

  return {
    dataDocs,
    // dataTypes: Array.from(dataTypes),
  };
}

/**
 * Expose actions to store
 *
 * @param {*} tagName
 * @param {*} path
 * @param {*} object
 * @param {*} callback
 */
function exposeActionsToStore(tagName, path, object, callback) {
  const filepath = getStoreFilePath(tagName);

  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      callback();
      return;
    }
    let codeLines = data.split('\n');
    const startIndex = codeLines.findIndex((line) =>
      line.includes('// ^ Expose actions generated by openapi-generator'),
    );

    codeLines.splice(
      startIndex + 1,
      0,
      Object.keys(object)
        .map((method) => toCamelCase(object[method].operationId))
        .join(',\n') + ',',
    );

    fs.writeFile(filepath, codeLines.join('\n'), () => {
      // console.log('write', filepath);
      callback();
    });
  });
}
