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
      // console.log(
      //   '--------------------------------------------------------------------------',
      // );
      // console.log(tag, ' : ', path);
      // console.log('------------------');
      // console.log(object);
      generators.push((cb) => {
        try {
          addActionsToStore(tag, path, object, cb);
        } catch (e) {
          console.log('ERROR', e);
        }
      });
      // console.log(
      //   '--------------------------------------------------------------------------',
      // );
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
      // const options = parseOptions(pathInfo);
      const requestBody = parseRequestBody(pathInfo.requestBody);
      const responses = parseResponses(pathInfo.responses);

      return `

    /**
     * ## ${pathInfo.summary}
     * ${pathInfo.description}
     * @tags ${pathInfo.tags ? `\`${pathInfo.tags.join(', ')}\`` : ''}
     * ${[].concat(parameters.paramDocs, requestBody.docs).join('\n     * ')}
     */
    ${operationId}: flow(function* (${parameters.paramArgs
        .concat(requestBody.payload)
        .map((i) => i.join(': '))
        .join(', ')} 
    ) {
      if(self.isPending) return;
      self.pending();
      const response = yield ${toCamelCase(
        pathInfo.tags[0],
      )}Api.${operationId}(${[].concat(parameters.paramArgs, requestBody.payload).map((i) => i[0]).join(', ')});
      if (response.kind === 'ok') {
        self.done();
        return response.data.data as ${'any'};
      } else {
        self.error(response);
        console.error(response.kind);
      }
    })`;
    })
    .join(',\n');
}

function parseParameters(params) {
  const paramDocs = [];
  const paramArgs = [];
  console.log(params);
  params &&
    params
      .filter((p) => p.in === 'path' || p.in === 'query')
      .forEach((p) => {
        const name = toCamelCase(p.name);
        const type = convertDataType(p.schema);
        const format = p.schema.format ? `(${p.schema.format})` : '';
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

function parseRequestBody(requestBody) {
  const docs = [];
  const payload = [];
  if (requestBody) {
    const required = requestBody.required ? '**REQUIRED**' : '';
    const description = requestBody.description || '';

    const contentType = Object.keys(requestBody).includes(
      'application/json',
    )
      ? 'application/json'
      : Object.keys(requestBody.content)[0];

    // const type = contentType
    //   ? convertDataType(requestBody.content[contentType].schema)
    //   : 'any';
    // const format = `{${type}}`;
    const type = 'any'
    const format = `{any}`;

    docs.push(
      [
        '@param',
        `{${type}}`,
        'payload',
        required,
        format,
        description,
      ].join(' '),
    );
    payload.push(['payload', type]);
  }
  return {
    docs,
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
