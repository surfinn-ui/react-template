const jsonpath = require('jsonpath');
const { exec } = require('child_process');
const fs = require('fs');
const { json } = require('stream/consumers');

function typeDetect(type) {
  if (!type) return null;
  if (['boolean'].includes(type)) return 'boolean';
  if (['number', 'integer'].includes(type)) return 'number';
  if (['string'].includes(type)) return 'string';
  if (['array'].includes(type)) return 'array';
  if (['object'].includes(type)) return 'object';
  return 'any';
}

/**
 *
 * @param {*} schema
 * @returns
 */
function convertDataType(schema) {
  const type = typeDetect(schema?.type);
  if (type === 'array') {
    if (schema.items.$ref) {
      return `I${toPascalCase(
        schema.items.$ref.substring(schema.items.$ref.lastIndexOf('/') + 1),
      )}Model[]`;
    } else {
      const type = typeDetect(schema.items.type);
      return `${type}[]`;
    }
  } else if (type === 'object') {
    return 'object';
  }

  // 참조인 경우
  if (schema?.$ref) {
    return `I${toPascalCase(
      schema.$ref.substring(schema.$ref.lastIndexOf('/') + 1),
    )}Model`;
  }

  return type;
}

function isResponseTypeArray(node, method) {
  const ref = jsonpath.query(
    node[method],
    '$..responses..content[*].schema["$ref"]',
  )[0];

  if (ref) {
    const refDataType = jsonpath.query(
      document,
      `$.components.schemas.${ref.substring(
        ref.lastIndexOf('/') + 1,
      )}.properties.data.type`,
    )[0];
    return refDataType === 'array';
  }

  return (
    jsonpath.query(node[method], '$..responses..content[*].schema.type')[0] ===
    'array'
  );
}

function returnType(node, method) {
  if (
    jsonpath.query(node[method], '$..responses..content[*].schema.type')[0] ===
    'array'
  ) {
    const refs = jsonpath.query(node[method], '$.responses..items["$ref"]')[0];
    if (refs) {
      return `I${toPascalCase(
        refs
          .substring(refs.lastIndexOf('/') + 1)
          .replace(/^successResponse(list)?/i, ''),
      )}Model`;
    } else {
      return `${jsonpath.query(node[method], '$.responses..items.type')[0]}[]`;
    }
  } else {
    const refs = jsonpath.query(node[method], '$.responses..schema["$ref"]')[0];
    if (refs) {
      return `I${toPascalCase(
        refs
          .substring(refs.lastIndexOf('/') + 1)
          .replace(/^successResponse(list)?/i, ''),
      )}Model`;
    } else {
      const refs = jsonpath.query(node[method], '$.responses..schema.type')[0];
      return convertDataType(
        refs?.substring(refs.lastIndexOf('/') + 1) || 'any',
      );
    }
  }
}

function addImports(filepath, imports, callback) {
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
        callback();
      });
    }
  });
}

/**
 *
 * @param {*} string
 * @returns
 */
function toCamelCase(string) {
  return string
    .replace(/([-_ \/][a-z0-9])/gi, ($1) => {
      return $1
        .toUpperCase()
        .replace('-', '')
        .replace('_', '')
        .replace('/', '')
        .replace(' ', '');
    })
    .replace(/^[A-Z]/, (val) => val.toLowerCase());
}

/**
 *
 * @param {*} string
 * @returns
 */
function toPascalCase(string) {
  return toCamelCase(string).replace(/^[a-z]/, (val) => val.toUpperCase());
}

function toParagraphCase(string) {
  return string
    .replace(/([A-Z])/g, ($1) => ` ${$1.toLowerCase()}`)
    .replace(/^[_]/, ($1) => $1.toLowerCase().replace('_', ' '))
    .replace(/^[a-z]/, (val) => val.toUpperCase());
}

function toSnakeCase(string) {
  return string
    .replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`)
    .replace(/^[_]/, ($1) => $1.toLowerCase().replace('_', ''));
}

function toKebabCase(string) {
  return toSnakeCase(string).replace(/_/g, '');
}

function toConstantCase(string) {
  return string.replace(/([A-Z])/g, ($1) => `_${$1}`).toUpperCase();
}

function format(callback) {
  exec(`cd ../ && npm run format && cd openapi-generator`, callback);
}

/**
 *
 * @returns
 */
function getSchemasFromComponents() {
  if (document.openapi?.startsWith('3')) {
    return jsonpath.nodes(document, '$.components.schemas.*');
  }
  if (document.swagger?.startsWith('2')) {
    return jsonpath.nodes(document, '$.definitions.*');
  }
}

// ------------------------------------------------------------------

// ------------------------------------------------------------------
function getServers() {
  return jsonpath.query(document, '$.servers[*]');
}
function getTags() {
  return jsonpath.query(document, '$.tags[*]');
}
function getTagNames() {
  return jsonpath.query(document, '$.tags[*].name');
}
function getPaths() {
  return jsonpath.nodes(document, '$.paths[*]');
}
function getOperationIds() {
  return jsonpath.query(document, '$.paths[*].operationId');
}
function collectTagsFromPaths() {
  return jsonpath.query(document, '$.paths[*]..tags[*]');
}

function getComponentBy$ref($ref) {
  const path = $ref
    .replace(/^#/, '$')
    .split('/')
    .join('.')
    .replace(/(\.[^\.]+)$/, ($1) => {
      return `["${$1.replace('.', '')}"]`;
    });
  return jsonpath.query(document, `${path}`)[0];
}

// paths ----------------------------------------------------------------
function getParametersByPathAndMethod(path, method) {
  return jsonpath
    .query(document, `$.paths.${path}[*].parameters[${method}]`)
    .map((p) => {
      if (p.$ref) {
        return getComponentBy$ref(p.$ref);
      } else {
        return p;
      }
    });
}

function getRequestBodyByPathAndMethod(path, method) {
  let description, contentTypes, contents;
  if (document.openapi?.startsWith('3')) {
    description = jsonpath.query(
      document,
      `$.paths['${path}']['${method}'].requestBody.description`,
    )[0];

    const v = jsonpath.query(
      document,
      `$.paths['${path}']['${method}'].requestBody.content`,
    );
    contentTypes = v.length > 0 ? Object.keys(v[0]) : [];

    contents = jsonpath.query(
      document,
      `$.paths['${path}']['${method}'].requestBody.content[*]`,
    );
  }

  if (document.swagger?.startsWith('2')) {
    contentTypes = jsonpath.query(
      document,
      `$.paths['${path}']['${method}'].consumes`,
    );
    contents = jsonpath.query(
      document,
      `$.paths['${path}']['${method}'].parameters[?(@.in == 'body')]`,
    );
  }

  if (contents.length > 0) {
    return {
      type:
        contentTypes.length > 0
          ? contentTypes.includes('application/json')
            ? 'application/json'
            : contentTypes[0]
          : undefined,
      content: contents[0]
        ? contents[0].schema
          ? contents[0].schema.$ref
            ? getComponentBy$ref(contents[0].schema.$ref)
            : contents[0].schema
          : contents[0]
        : undefined,
      schema: contents[0].schema
        ? contents[0].schema.$ref
          ? toPascalCase(contents[0]?.schema?.$ref?.split('/')?.pop() || '')
          : contents[0].schema.type === 'object'
          ? contents[0].schema.additionalProperties
            ? contents[0].schema.additionalProperties.type
            : contents[0].schema.type
          : contents[0].schema.type
        : null,
      description: description,
    };
  }
  return;
}

function getResponsesByPathAndMethod(path, method) {
  return jsonpath
    .query(document, `$.paths.${path}[*].responses[${method}]`)
    .map((p) => {
      if (p.$ref) {
        return getComponentBy$ref(p.$ref);
      } else {
        return p;
      }
    });
}

// ################################################################################################
// OPENAPI 3 OBJECT PARSERS
// ################################################################################################

/**
 * # Operation Object
 * Describes a single API operation on a path.
 * @param {*} operationObject
 */
function parseOperationObject(operationObject) {
  /**
   * A list of tags for API documentation control.
   * Tags can be used for logical grouping of operations by resources or any other qualifier.
   * @type {string[]}
   */
  const tags = operationObject.tags;

  /**
   * A short summary of what the operation does.
   * @type {string}
   */
  const summary = operationObject.summary;

  /**
   * A verbose explanation of the operation behavior.
   * CommonMark syntax MAY be used for rich text representation.
   * @type {string}
   */
  const description = operationObject.description;

  /**
   * Additional external documentation for this operation.
   * @type {ExternalDocumentationObject}
   */
  const externalDocs = parseExternalDocs(operationObject.externalDocs);

  /**
   * Unique string used to identify the operation.
   * The id MUST be unique among all operations described in the API.
   * The operationId value is case-sensitive.
   * Tools and libraries MAY use the operationId to uniquely identify an operation,
   * therefore, it is RECOMMENDED to follow common programming naming conventions.
   * @type {string}
   */
  const operationId = operationObject.operationId;

  /**
   * A list of parameters that are applicable for this operation.
   * If a parameter is already defined at the Path Item, the new definition will override it but can never remove it.
   * The list MUST NOT include duplicated parameters.
   * A unique parameter is defined by a combination of a name and location.
   * The list can use the Reference Object to link to parameters that are defined at the OpenAPI Object's components/parameters.
   * @type {ParameterObject[]}
   */
  const parameters = parseParameters(operationObject.parameters);

  /**
   * The request body applicable for this operation.
   * The requestBody is only supported in HTTP methods where the HTTP 1.1 specification RFC7231 has explicitly defined semantics for request bodies.
   * In other cases where the HTTP spec is vague, requestBody SHALL be ignored by consumers.
   * @type {RequestBodyObject | ReferenceObject}
   */
  const requestBody = parseRequestBody(operationObject.requestBody);

  /**
   * The list of possible responses as they are returned from executing this operation.
   * @type {ResponsesObject}
   */
  const responses = parseResponse(operationObject.responses);

  /**
   * Declares this operation to be deprecated.
   */
  const deprecated = !!operationObject.deprecated;

  return {
    tags,
    summary,
    description,
    externalDocs,
    operationId,
    parameters,
    requestBody,
    responses,
    deprecated,
  };
}

/**
 * # Parameters Object
 * @param {*} parameters
 * @returns
 */
function parseParameters(parameters) {
  if (!parameters) {
    return [];
  }
  return parameters.map((parameter) => {
    return parseParameter(parameter);
  });
}

/**
 * # Parameter Object
 * @param {*} parameter
 * @returns
 */
function parseParameter(parameter) {
  if (!parameter.name) {
    throw new Error('parameter.name is not defined');
  }
  if (!parameter.in) {
    throw new Error('parameter.in is not defined');
  }
  const name = parameter.name;
  const in_ = parameter.in;
  const description = parameter.description;
  const required = !!parameter.required;
  const deprecated = !!parameter.deprecated;
  const allowEmptyValue = !!parameter.allowEmptyValue;
  const style = parseStyle(parameter.in, parameter.style);
  const explode = !!parameter.explode;
  const allowReserved = !!parameter.allowReserved;
  const schema = parseSchema(parameter.schema);
  const example = parameter.example;
  const examples = parseExamples(parameter.examples);
  const content = parseParameterContent(parameter.content);

  return {
    name,
    in: in_,
    description,
    required,
    deprecated,
    allowEmptyValue,
    style,
    explode,
    allowReserved,
    schema,
    example,
    examples,
    content,
  };
}

/**
 * # Parameter Content
 * @param {*} content
 * @returns
 */
function parseParameterContent(content) {
  if (!content) {
    return;
  }
  return Object.keys(content).map((key) => {
    return {
      type: key,
      content: parseMediaType(content[key]),
    };
  });
}

/**
 * # Style Values
 * @param {*} in_
 * @param {*} style
 * @returns
 */
function parseStyle(in_, style) {
  if (!style) {
    if (in_ === 'path') {
      return 'simple';
    } else if (in_ === 'query') {
      return 'form';
    } else if (in_ === 'header') {
      return 'simple';
    } else if (in_ === 'cookie') {
      return 'form';
    }
  }
  return style;
}

/**
 * # Request Body Object
 * Describes a single request body.
 *
 * @param {*} requestBodyObject
 * @returns
 */
function parseRequestBody(requestBodyObject) {
  /**
   * The content of the request body.
   * The key is a media type or media type range and the value describes it.
   * For requests that match multiple keys, only the most specific key is applicable.
   * e.g. text/plain overrides text/*
   * @type {Map<string, MediaTypeObject | ReferenceObject>}
   * @required
   */
  const content = parseMediaType(requestBodyObject.content);

  /**
   * A brief description of the request body.
   * This could contain examples of use.
   * CommonMark syntax MAY be used for rich text representation.
   * @type {string}
   */
  const description = requestBodyObject.description;

  /**
   * Determines if the request body is required in the request.
   * @type {boolean}
   * @default  false.
   */
  const required = requestBodyObject.required || false;

  // ==========================================================================

  const contentType = Object.keys(requestBodyObject.content).includes(
    'application/json',
  )
    ? 'application/json'
    : Object.keys(content)[0];

  return {
    required,
    description,
    contentType,
    content,
  };
}

/**
 * # Media Type Object
 * Each Media Type Object provides schema and examples for the media type identified by its key.
 * @param {*} mediaTypeObject
 * @returns
 */
function parseMediaType(mediaTypeObject) {
  if (!mediaTypeObject) {
    return;
  }

  /**
   * Content type of the object.
   * The value SHOULD be a specific media type (e.g. application/json).
   */
  const contentType = Object.keys(mediaTypeObject).includes('application/json')
    ? 'application/json'
    : Object.keys(mediaTypeObject)[0];

  /**
   * 	The schema defining the content of the request, response, or parameter.
   * @type {SchemaObject}
   */
  const schema = parseSchema(mediaTypeObject[contentType].schema);

  /**
   * Example of the media type.
   * The example object SHOULD be in the correct format as specified by the media type.
   * The `example` field is mutually exclusive of the `examples` field.
   * Furthermore, if referencing a `schema` which contains an example,
   * the `example` value SHALL override the example provided by the schema.
   * @type {any}
   */
  const example = mediaTypeObject[contentType].example;

  /**
   * Examples of the media type.
   * Each example object SHOULD match the media type and specified schema if present.
   * The `examples` field is mutually exclusive of the `example` field.
   * Furthermore, if referencing a `schema` which contains an example,
   * the `examples` value SHALL override the example provided by the schema.
   * @type {Map<string, ExampleObject | ReferenceObject>}
   */
  const examples = mediaTypeObject[contentType].examples;

  /**
   * A map between a property name and its encoding information.
   * The key, being the property name, MUST exist in the schema as a property.
   * The encoding object SHALL only apply to `requestBody` objects
   * when the media type is `multipart` or `application/x-www-form-urlencoded`.
   * @type {Map<string, EncodingObject>}
   */
  const encoding = mediaTypeObject[contentType].encoding;

  return {
    schema,
    example,
    examples,
    encoding,
  };
}

/**
 * # Schema Object
 * @param {*} schema
 * @returns
 */
function parseSchema(schema) {
  if (!schema) {
    return null;
  }

  if (schema.$ref) {
    return parseReference(schema);
  } else if (schema.type === 'object') {
    return {
      type: 'object',
      properties: parseProperties(schema.properties),
      additionalProperties: schema.additionalProperties,
    };
  } else if (schema.type === 'array') {
    return {
      type: 'array',
      items: parseSchema(schema.items),
    };
  }

  const discriminator = parseDiscriminator(schema.discriminator);
  const xml = parseXml(schema.xml);
  const externalDocs = parseExternalDocs(schema.externalDocs);
  const example = schema.example;

  return {
    discriminator,
    xml,
    externalDocs,
    example,
  };
}

/**
 * # Properties Values
 * @param {*} properties
 * @returns
 */
function parseProperties(properties) {
  if (!properties) {
    return null;
  }
  const result = {};
  Object.keys(properties).forEach((key) => {
    result[key] = parseSchema(properties[key]);
  });
  return result;
}

/**
 * # Discriminator Object
 * @param {*} discriminator
 * @returns
 */
function parseDiscriminator(discriminator) {
  if (!discriminator) {
    return null;
  }
  const propertyName = discriminator.propertyName;
  const mapping = discriminator.mapping;

  return {
    propertyName,
    mapping,
  };
}

/**
 * # XML Object
 * @param {*} xml
 * @returns
 */
function parseXml(xml) {
  if (!xml) {
    return null;
  }
  const name = xml.name;
  const namespace = xml.namespace;
  const prefix = xml.prefix;
  const attribute = xml.attribute;
  const wrapped = xml.wrapped;

  return {
    name,
    namespace,
    prefix,
    attribute,
    wrapped,
  };
}

/**
 * # External Documentation Object
 * @param {*} externalDocs
 * @returns
 */
function parseExternalDocs(externalDocs) {
  if (!externalDocs) {
    return null;
  }
  const url = externalDocs.url;
  if (!url) {
    throw new Error('externalDocs.url is required');
  }
  const description = externalDocs.description;
  return {
    url,
    description,
  };
}

/**
 * # Response Object
 * @param {*} responses
 * @returns
 */
function parseResponse(responses) {
  const responseKeys = Object.keys(responses);
  const responseMap = {};
  responseKeys.forEach((key) => {
    const response = responses[key];
    responseMap[key] = parseResponse(response);
  });
  return responseMap;
}

/**
 * # Reference Object
 * A simple object to allow referencing other components in the OpenAPI document, internally and externally.
 * The $ref string value contains a URI RFC3986, which identifies the location of the value being referenced.
 * See the rules for resolving Relative References.
 * @param {*} object
 * @returns
 */
function parseReference(object) {
  if (!object) {
    return null;
  }
  if (!object.$ref) {
    throw new Error('ReferenceObject.$ref is required');
  }

  const $refObject = getComponentBy$ref(object.$ref);

  const summary = object.summary;
  const description = object.description;
  const type = convertDataType($refObject);
  return {
    type,
    $refModel: object.$ref.split('/').pop(),
    $refObject,
    summary,
    description,
  };
}

function parseExamples(examples) {
  if (!examples) {
    return null;
  }

  return {
    examples: examples.map((example) => parseExample(example)),
  };
}

function parseExample(example) {
  if (!example) {
    return null;
  }
  const summary = example.summary;
  const description = example.description;
  const value = example.value;
  const externalValue = parseExternalValue(example.externalValue);

  return {
    summary,
    description,
    value: value ? JSON.parse(value) : externalValue ? externalValue : null,
  };
}

function parseExternalValue(externalValue) {
  if (!externalValue) {
    return null;
  }
  // TODO: parse externalValue to value
  return externalValue;
}

module.exports = {
  typeDetect,
  convertDataType,
  isResponseTypeArray,
  returnType,
  addImports,
  toCamelCase,
  toPascalCase,
  toParagraphCase,
  toSnakeCase,
  toKebabCase,
  toConstantCase,
  format,
  getSchemasFromComponents,
  getServers,
  getTags,
  getTagNames,
  getPaths,
  getOperationIds,
  collectTagsFromPaths,
  getComponentBy$ref,
  getParametersByPathAndMethod,
  getRequestBodyByPathAndMethod,
  getResponsesByPathAndMethod,
  parseOperationObject,
  parseParameters,
  parseParameter,
  parseParameterContent,
  parseStyle,
  parseRequestBody,
  parseMediaType,
  parseSchema,
  parseProperties,
  parseDiscriminator,
  parseXml,
  parseExternalDocs,
  parseResponse,
  parseReference,
  parseExamples,
  parseExample,
  parseExternalValue,
};
