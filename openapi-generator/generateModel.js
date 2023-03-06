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
 *
 * @param {*} api
 */
function generateModels(api, cb) {
  const generators = [];

  const schemas = getSchemasFromComponents(api).map((node) => {
    const name = node.path.pop();
    const object = node.value;
    return { name, value: object };
  });

  // Generate model
  schemas.forEach((schema) => {
    if (
      !fs.existsSync(
        `../src/models/${toCamelCase(schema.name)}/${schema.name}ModelProps.ts`,
      )
    ) {
      generators.push((cb) => {
        try {
          exec(`cd ../ && yarn gen  "model" "${schema.name}"`, cb);
        } catch (e) {
          console.log('ERROR', e);
        }
      });
    }
  });

  // Add imports to the model
  schemas.forEach((schema) => {
    const imports = [];

    jsonpath.query(schema.value.properties, '$..["$ref"]').forEach((ref) => {
      const $ref = ref.substring(ref.lastIndexOf('/') + 1);
      imports.push(
        `import { ${toPascalCase($ref)}Model } from '../${toCamelCase(
          $ref,
        )}/${toPascalCase($ref)}Model';`,
      );
    });

    generators.push((cb) => addImportsToModel(schema.name, imports, cb));
  });

  // add props to the model
  schemas.forEach((scheme) => {
    generators.push((cb) => addPropsToModel(scheme, cb));
  });

  series(generators, cb);
}

/**
 *
 * @param {*} name
 * @param {*} imports
 * @param {*} cb
 */
function addImportsToModel(name, imports, cb) {
  const filepath = `../src/models/${toCamelCase(name)}/${name}ModelProps.ts`;
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
        cb();
      });
    }
  });
}

/**
 *
 * @param {*} schema
 * @param {*} cb
 */
function addPropsToModel(schema, cb) {
  const filepath = `../src/models/${toCamelCase(schema.name)}/${toPascalCase(
    schema.name,
  )}ModelProps.ts`;

  fs.readFile(filepath, 'utf8', (err, file) => {
    if (err) {
      return console.log(err);
    }
    let codeLines = [];

    codeLines = file.toString().split('\n');
    const startIndex = codeLines.findIndex((line) =>
      line.endsWith(`Props = {`),
    );
    const endIndex = codeLines.findLastIndex((line) => line.endsWith(`};`));

    const props = getModelPropsCode(schema);

    codeLines.splice(startIndex + 1, endIndex - startIndex - 1, props);

    fs.writeFile(filepath, codeLines.join('\n'), () => {
      console.log('write', filepath);
      cb();
    });
  });
}

/**
 *
 * @param {*} schema
 * @returns
 */
function getModelPropsCode(schema) {
  const schemaName = schema.name;
  const requires = schema.value.required || [];
  const properties = schema.value.properties;
  const codeLines = [];
  Object.keys(properties).forEach((propName) => {
    const propValue = properties[propName];
    let type = 'types.string';

    if (propValue.$ref) {
      const $ref = propValue.$ref.substring(
        propValue.$ref.lastIndexOf('/') + 1,
      );
      type = `${$ref}Model`;
    } else {
      // prettier-ignore
      switch (propValue.type) {
        case 'integer': type = 'types.number';  break;
        case 'number' : type = 'types.number';  break;
        case 'string' : type = 'types.string';  break;
        case 'boolean': type = 'types.boolean'; break;
        case 'array':
          if (propValue.items.type) {
            type = `types.array(types.${propValue.items.type})`;
          } else if (propValue.items.$ref) {
            const $ref = propValue.items.$ref.substring(
              propValue.items.$ref.lastIndexOf('/') + 1,
              );
              type = `types.array(${$ref}Model)`;
            }
            break;
            
            // TODO  컴포넌트에 정의된 타입을 찾아서 추가해야 한다.
            case 'object':
              if (propValue.items.$ref) {
                const $ref = propValue.items.$ref.substring(
                  propValue.items.$ref.lastIndexOf('/') + 1,
          );
          type = `${$ref}Model`;
        } else {
          type = `types.frozen({})`;
        }
      }
    }

    if (propValue.enum) {
      type = `types.enumeration("${
        schemaName + ':' + propName
      }", ${JSON.stringify(propValue.enum)})`;
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
            ? 'types.identifier'
            : 'types.identifierNumber';
        requires.push(propName);
      } else {
        // NOTE - 참조하는 스키마의 아이디 - 명시적으로 $ref를 사용하지 않아도 참조하는 스키마의 아이디를 찾아서 추가한다. ???
        // type = propValue.type === `types.reference()`;
      }
    }

    codeLines.push('/**');
    if (propValue.description !== undefined)
      codeLines.push(` * @description  ${propValue.description}`);

    if (propValue.format !== undefined)
      codeLines.push(` * @format ${propValue.format}`);
    if (propValue.pattern !== undefined)
      codeLines.push(` * @pattern ${propValue.pattern}`);

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

    if (requires.includes(propName)) {
      codeLines.push(' * @required ', ' */', `    ${propName}: ${type}, `);
    } else {
      codeLines.push(
        ' * @nullable',
        ' */',
        `    ${propName}: types.maybeNull(${type}), `,
      );
    }
  });

  return codeLines.join('\n');
}

module.exports = {
  generateModels,
};
