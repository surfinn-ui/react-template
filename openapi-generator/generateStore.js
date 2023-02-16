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
 * generate store
 *
 * @param {*} api
 * @param {*} cb
 */
function generateStores(api, cb) {
  const generators = [];
  getTagNames(api).forEach((tag) => {
    generators.push((cb) => {
      try {
        exec(`cd ../ && yarn gen store "${tag}"`, cb);
      } catch (e) {
        console.log('ERROR', e);
      }
    });

    getPathsByTag(api, tag).forEach((node) => {
      const path = node.path.pop();
      const object = node.value;
      console.log(
        '--------------------------------------------------------------------------',
      );
      console.log(tag, ' : ', path);
      console.log('------------------');
      console.log(object);
      generators.push((cb) => {
        try {
          addActionsToStore(tag, path, object, cb);
        } catch (e) {
          console.log('ERROR', e);
        }
      });
      console.log(
        '--------------------------------------------------------------------------',
      );
    });
  });
  series(generators, cb);
}

module.exports = {
  generateStores,
};

function getPathsByTag(api, tag) {
  return getPaths(api).filter((node) => {
    const object = node.value;
    return jsonpath.query(object, '$..tags[0]')[0] === tag;
  });
}

function addActionsToStore(tag, path, object, cb) {
  const filepath = `../src/stores/${tag}.store.ts`;

  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    let codeLines = data.split('\n');
    const index = codeLines.findIndex((line) =>
      line.includes('// ^ generated actions by openapi-generator'),
    );

    codeLines.splice(
      index + 1,
      0,
      `
      ${getActionCodes(path, object)},
    `,
    );

    fs.writeFile(filepath, codeLines.join('\n'), () => {
      console.log('write', filepath);
      cb();
    });
  });
}

function getActionCodes(path, object) {
  return Object.keys(object)
    .map((method) => {
      const pathInfo = object[method];
      const operationId = toCamelCase(pathInfo.operationId);

      const parameters = parseParameters(pathInfo.parameters);
      const requestBody = parseRequestBody(pathInfo.requestBody);
      const responses = parseResponses(pathInfo.responses);

      return `

    /**
     * ${pathInfo.summary}
     * 
     * ${pathInfo.description}
     * 
     * @tags *${pathInfo.tags.join(', ')}*
     * @method **${method.toUpperCase()}**
     * @endpoint \`${path}\`
${parameters.headerDocs.join('\n')}
${parameters.paramDocs.join('\n')}
${requestBody.payloadDocs.join('\n')}
     */
    ${operationId}: flow(function* (${parameters.paramArgs
        .map((i) => i.join(': '))
        .join(', ')} 
        ${
          requestBody.payload &&
          `, ${requestBody.payload.map((i) => i.join(': ')).join(', ')}`
        }  
    ) {
      self.setFetchState(FetchStates.PENDING);
      const response = yield ${toCamelCase(
        pathInfo.tags[0],
      )}Api.${operationId}(${parameters.paramArgs.map((i) => i[0]).join(', ')} 
        ${
          requestBody.payload &&
          `, ${requestBody.payload.map((i) => i[0]).join(', ')}`
        } );
      if (response.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
        return response.data as ${responses.responseType};
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(response.kind);
      }
    })`;
    })
    .join(',\n');
}

function parseParameters(params) {
  const headerDocs = [];
  const paramDocs = [];
  const paramArgs = [];

  params &&
    params
      // .filter((p) => p.in === 'path' || p.in === 'query')
      .forEach((p) => {
        const name = toCamelCase(p.name);
        const type = convertDataType(p.schema);
        const required = p.required ? '**REQUIRED**' : 'optional';
        const paramIn = `in ${p.in}`;
        const description = p.description || '';
        paramDocs.push(`     * @param ${name} ${description}`);
        paramDocs.push(
          `     *        It's a ${type}, ${required} and ${paramIn}.`,
        );
        if (p.in === 'path' || p.in === 'query') {
          paramArgs.push([`${name}`, `${type}`]);
        } else if (p.in === 'header') {
          headerDocs.push(`     * @header ${name} ${description}`);
          headerDocs.push(
            `     *        It's a ${type}, ${required} and ${paramIn}.`,
          );
        }
      });

  return {
    headerDocs,
    paramDocs,
    paramArgs,
  };
}

function parseRequestBody(requestBody) {
  const payloadDocs = [];
  const payload = [];
  if (requestBody) {
    payload.push(['payload', 'string']);
    payloadDocs.push(`     @payload ${Object.keys(requestBody?.content)}`);
    payloadDocs.push(`              ${requestBody?.description}`);
    payloadDocs.push(
      `              ${requestBody?.required ? '**REQUIRED**' : 'optional'}`,
    );
    payloadDocs.push(
      `              ${
        requestBody?.content['application/json']
          ? requestBody?.content['application/json'].schema
          : Object.keys(requestBody?.content)?.[0]
      }`,
    );
  }
  return {
    payloadDocs,
    payload,
  };
}

function parseResponses(params) {
  const dataDocs = [];
  const data = [];
  const responses = params && params.responses?.content;

  return {
    dataDocs,
    data,
  };
}
