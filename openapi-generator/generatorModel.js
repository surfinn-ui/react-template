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
 *
 * @param {*} api
 */
function generateModels(api, cb) {
  const generators = [];

  const schemes = getSchemes(api).map((node) => {
    const name = node.path.pop();
    const object = node.value;
    return { name, value: object };
  });

  schemes.forEach((scheme) => {
    generators.push((cb) => {
      try {
        exec(`cd ../ && npx ignite-cli generate "model" "${scheme.name}"`, cb);
      } catch (e) {
        console.log('ERROR', e);
      }
    });
  });

  // add imports to the model
  schemes.forEach((scheme) => {
    const imports = [];
    jsonpath
      .query(scheme.value.properties, '$..items["$ref"]')
      .forEach((ref) => {
        const $ref = ref.substring(ref.lastIndexOf('/') + 1);
        imports.push(`import { ${$ref}Model } from './${$ref}.model';`);
      });
    generators.push((cb) => addImportsToModel(scheme.name, imports, cb));
  });

  // add props to the model
  schemes.forEach((scheme) => {
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
  const filepath = `../src/models/${name}.model.ts`;
  fs.readFile(filepath, 'utf8', (err, file) => {
    if (err) {
      console.log(err);
    } else {
      let codeLines = [];
      codeLines = file.toString().split('\n');
      const index = codeLines.findIndex((line) =>
        line.includes(
          `import { withSetPropAction } from "./withSetPropAction"`,
        ),
      );

      codeLines.splice(index + 1, 0, imports);
      fs.writeFile(filepath, codeLines.join('\n'), () => {
        console.log('write', filepath);
        cb();
      });
    }
  });
}

/**
 *
 * @param {*} scheme
 * @param {*} cb
 */
function addPropsToModel(scheme, cb) {
  const filepath = `../src/models/${scheme.name}.model.ts`;

  fs.readFile(filepath, 'utf8', (err, file) => {
    if (err) {
      console.log(err);
    } else {
      let codeLines = [];
      codeLines = file.toString().split('\n');
      const index = codeLines.findIndex((line) => line.includes(`.props({`));

      const codes = getModelPropsCode(scheme.value.properties);
      codeLines.splice(index + 1, 0, codes);
      fs.writeFile(filepath, codeLines.join('\n'), () => {
        console.log('write', filepath);
        cb();
      });
    }
  });
}

/**
 *
 * @param {*} properties
 * @returns
 */
function getModelPropsCode(properties) {
  const codeLines = [];
  const keys = Object.keys(properties);
  keys.forEach((key) => {
    const prop = properties[key];

    let type = 'types.string';
    switch (prop.type) {
      case 'integer':
        type = 'types.number';
        break;
      case 'number':
        type = 'types.number';
        break;
      case 'string':
        type = 'types.string';
        break;
      case 'boolean':
        type = 'types.boolean';
        break;
      case 'array':
        if (prop.items.type) {
          type = `types.array(types.${prop.items.type})`;
        } else if (prop.items.$ref) {
          // (prop.items.$ref).replace('#', '$').replace('/', '.');
          const $ref = prop.items.$ref.substring(
            prop.items.$ref.lastIndexOf('/') + 1,
          );
          type = `types.array(${$ref}Model)`;
        }
        break;
      case 'object':
        type = `types.frozen({})`;
    }

    if (key === 'id' || key === 'Id') {
      type = 'types.identifier';
    } else if (key.endsWith('Sid')) {
      type = 'types.identifierNumber';
    }

    codeLines.push(
      `    ${key}: types.maybeNull(${type}), // ${prop.required} | ${prop.format} | ${prop.example} | ${prop.maxLength} | ${prop.minLength} | ${prop.minimum} | ${prop.maximum} | ${prop.pattern}`,
    );
  });

  return codeLines.join('\n');
}

module.exports = {
  generateModels,
};
