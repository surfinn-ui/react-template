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
 * Generate Models
 *
 */
function generateModels(callback) {
  const generators = [];

  const schemas = getSchemasFromComponents()
    .filter((node) => node.value.type === 'object')
    .map((node) => {
      const name = node.path.pop();
      const object = node.value;
      return { name, value: object };
    })
    .filter((schema) => !schema.name.startsWith('SuccessResponse'));

  // console.log(getSchemasFromComponents());

  // Generate model
  schemas.forEach((schema) => {
    if (
      !fs.existsSync(
        `./src/models/${toCamelCase(schema.name)}/${toPascalCase(
          schema.name,
        )}Model.ts`,
      )
    ) {
      generators.push((callback) => {
        console.log(
          'Since the model does not exist, we create a model named: ',
          toPascalCase(schema.name),
        );
        try {
          exec(`yarn gen "model" "${toPascalCase(schema.name)}"`, callback);
        } catch (e) {
          console.log('ERROR', e);
        }
      });
    }
  });

  // Add imports to the model
  schemas.forEach((schema) => {
    const imports = new Set();
    jsonpath.query(schema, '$..["$ref"]').forEach((ref) => {
      const $ref = getComponentBy$ref(ref);
      // console.log('schema', schema.name, ref, $ref);
      if ($ref.type === 'object') {
        const refName = toPascalCase(ref.split('/').pop());
        if (refName === schema.name) {
          imports.add(`import { IAnyModelType } from 'mobx-state-tree';`);
        }
        imports.add(
          `import { ${refName}Model } from '../${toCamelCase(
            refName,
          )}/${refName}Model';`,
        );
      }
    });

    generators.push((callback) =>
      addImportsToModel(schema.name, [...imports], callback),
    );
  });

  // add props to the model
  schemas.forEach((scheme) => {
    generators.push((callback) => addPropsToModel(scheme, callback));
  });

  series(generators, callback);
}

function getModelPropsFilePath(name) {
  return `./src/models/${toCamelCase(name)}/${toPascalCase(name)}ModelProps.ts`;
}

/**
 *
 * @param {*} name
 * @param {*} imports
 * @param {*} callback
 */
function addImportsToModel(name, imports, callback) {
  const filepath = getModelPropsFilePath(name);
  addImports(filepath, imports, callback);
}

/**
 *
 * @param {*} schema
 * @param {*} callback
 */
function addPropsToModel(schema, callback) {
  const filepath = getModelPropsFilePath(schema.name);

  fs.readFile(filepath, 'utf8', (err, file) => {
    if (err) {
      return console.log(err);
    }
    let codeLines = [];

    codeLines = file.toString().split('\n');
    const startIndex = codeLines.findLastIndex((line) =>
      line.endsWith(`// ^ Model Properties generated by openapi-generator`),
    );

    const endIndex = codeLines.findLastIndex((line) =>
      line.endsWith(`// $ Model Properties generated by openapi-generator`),
    );

    const props = getModelPropsCode(schema);

    codeLines.splice(startIndex + 1, endIndex - startIndex - 1, props);

    fs.writeFile(filepath, codeLines.join('\n'), () => {
      callback();
    });
  });
}

/**
 *
 * @param {*} schema
 * @returns
 */
function getModelPropsCode(schema) {
  const properties = schema.value.properties;
  if (!properties) {
    return '';
  }

  // console.log('schema', schema.name, JSON.stringify(properties, null, 2))

  const schemaName = toCamelCase(schema.name);
  const requires = schema.value.required || [];
  const codeLines = [];

  Object.keys(properties).forEach((propName) => {
    let propValue = properties[propName];
    let type = 'types.string';

    let $ref = null;
    let $refName = '';
    if (propValue.$ref) {
      // console.log('propValue.$ref', schemaName, propValue.$ref);
      $ref = getComponentBy$ref(propValue.$ref);
      $refName = propValue.$ref.split('/').pop();
      type = $ref.type;
      propValue = $ref;
    }

    // prettier-ignore
    switch (propValue.type) {
      case 'integer': type = 'types.number';  break;
      case 'number' : type = 'types.number';  break;
      case 'string' : type = 'types.string';  break;
      case 'boolean': type = 'types.boolean'; break;
      case 'array':
        if (propValue.items.type) {
          switch (propValue.items.type) {
            case 'integer': type = 'types.array(types.number)';  break;
            case 'number' : type = 'types.array(types.number)';  break;
            case 'string' : type = 'types.array(types.string)';  break;
            case 'boolean': type = 'types.array(types.boolean)'; break;
            case 'object': type = 'types.array(types.frozen({}))'; break;
          }
        } else if (propValue.items.$ref) {
          $ref = getComponentBy$ref(propValue.items.$ref);
          if ($ref.type === 'object') {
            type = `types.array(${toPascalCase(propValue.items.$ref.split('/').pop())}Model)`;
          } else {
            type = `types.array(types.${$ref.type})`;
          }
        }
        break;
        case 'object':
          if ($ref) {
          if ($ref.type === 'object') {
            if (toPascalCase($refName) === toPascalCase(schemaName)) {
              type = `types.late((): IAnyModelType => ${toPascalCase($refName)}Model)`
            } else {
              type = `${toPascalCase($refName)}Model`;
            }
          } else {
            type = `types.frozen({})`;
          }
        } else {
          type = `types.frozen({})`;
        }
        break;
    }

    if (propValue.enum) {
      type = `types.enumeration("${toConstantCase(propName)}", ${JSON.stringify(
        propValue.enum,
      )})`;
    }

    if (
      propName.endsWith('id') ||
      propName.endsWith('Id') ||
      propName.endsWith('ID')
    ) {
      if (
        propName === 'id' ||
        propName === 'Id' ||
        propName === 'ID' ||
        propName.startsWith(schemaName)
      ) {
        type =
          propValue.type === 'string'
            ? 'types.maybeNull(types.identifier)'
            : 'types.maybeNull(types.identifierNumber)';
        requires.push(propName);
      } else {
        // NOTE - 참조하는 스키마의 아이디 - 명시적으로 $ref를 사용하지 않아도 참조하는 스키마의 아이디를 찾아서 추가한다. ???
        // type = propValue.type === `types.reference()`;
      }
    }

    codeLines.push('/**');
    if (propValue.description !== undefined)
      codeLines.push(` * @description  ${propValue.description}`);
    if (propValue.type) 
      codeLines.push(` * @type ${propValue.type}`);
    if (propValue.format !== undefined)
      codeLines.push(` * @format ${propValue.format}`);
    if (propValue.pattern !== undefined)
      codeLines.push(` * @pattern ${propValue.pattern}`);
    if (propValue.enum !== undefined) {
      if (propValue.type === 'string') codeLines.push(` * @enum '${propValue.enum.join("' | '")}'`);
      else codeLines.push(` * @enum ${propValue.enum.join(' | ')}`);
    }

    // string
    if (propValue.minLength !== undefined)
      codeLines.push(` * @minLength ${propValue.minLength}`);
    if (propValue.maxLength !== undefined)
      codeLines.push(` * @maxLength ${propValue.maxLength}`);

    // number
    if (propValue.minimum !== undefined)
      codeLines.push(` * @minimum ${propValue.minimum}`);
    if (propValue.maximum !== undefined)
      codeLines.push(` * @maximum ${propValue.maximum}`);

    if (propValue.example !== undefined)
      codeLines.push(` * @example ${propValue.example}`);

    if (propValue.writeOnly) {
      codeLines.push(` * @writeOnly `);
    }

    if (requires.includes(propName)) {
      codeLines.push(
        ' * @required ',
        ' */',
        `    '${toCamelCase(propName)}': ${type}, `,
      );
    } else {
      // console.log(propName, propValue.type);
      codeLines.push(
        ' * @nullable',
        ' */',
        `    '${toCamelCase(
          propName,
        )}': types.optional(types.maybeNull(${type}), ${
          propValue.type === 'boolean'
            ? 'false'
            : propValue.type === 'number' || propValue.type === 'integer'
            ? '0'
            : propValue.type === 'array'
            ? '[]'
            : propValue.type === 'object'
            ? '{}'
            : propValue.enum
            ? `"${propValue.enum[0]}"`
            : "''"
        }), `,
      );
    }
  });

  return codeLines.join('\n');
}

module.exports = {
  generateModels,
};
