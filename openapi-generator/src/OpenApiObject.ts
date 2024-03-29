import { Components } from "./ComponentsObject";
import { ExternalDocumentation } from "./ExternalDocumentationObject";
import { Info } from "./InfoObject";
import { PathItem } from "./PathItemObject";
import { Paths } from "./PathsObject";
import { Reference } from "./ReferenceObject";
import { SecurityRequirement } from "./SecurityRequirementObject";
import { Server } from "./ServerObject";
import { Tag } from "./TagObject";

class OpenApi {
  /**
   * This string MUST be the version number of the OpenAPI Specification 
   * that the OpenAPI document uses. 
   * The openapi field SHOULD be used by tooling to interpret the OpenAPI document. 
   * This is not related to the API info.version string.
   * @required
   */
  openapi: string;

  /**
   * Provides metadata about the API. The metadata MAY be used by tooling as required.
   * @required
   */
  info: Info;

  /**
   * The default value for the $schema keyword within Schema Objects contained within this OAS document. 
   * This MUST be in the form of a URI.
   */
  jsonSchemaDialect?: string;

  /**
   * An array of Server Objects, which provide connectivity information to a target server. 
   * If the servers property is not provided, or is an empty array, 
   * the default value would be a Server Object with a url value of /.
   */
  servers: Server[];
  
  /**
   * The available paths and operations for the API.
   */
  paths: Paths;

  /**
   * The incoming webhooks that MAY be received as part of this API 
   * and that the API consumer MAY choose to implement. 
   * Closely related to the `callbacks` feature, 
   * this section describes requests initiated other than by an API call, 
   * for example by an out of band registration. 
   * The key name is a unique string to refer to each webhook, 
   * while the (optionally referenced) Path Item Object describes a request 
   * that may be initiated by the API provider and the expected responses. 
   * An [example](https://swagger.io/specification/examples/v3.1/webhook-example.yaml) is available.
   */
  webhooks?: Map<string, PathItem | Reference>;

  /**
   * An element to hold various schemas for the document.
   */
  components: Components;

  /**
   * A declaration of which security mechanisms can be used across the API. 
   * The list of values includes alternative security requirement objects that can be used. 
   * Only one of the security requirement objects need to be satisfied to authorize a request. 
   * Individual operations can override this definition. 
   * To make security optional, an empty security requirement ({}) can be included in the array.
   */
  security: SecurityRequirement[];

  /**
   * A list of tags used by the document with additional metadata. 
   * The order of the tags can be used to reflect on their order by the parsing tools. 
   * Not all tags that are used by the Operation Object must be declared. 
   * The tags that are not declared MAY be organized randomly or based on the tools' logic. 
   * Each tag name in the list MUST be unique.
   */
  tags: Tag[];

  /**
   * Additional external documentation.
   */
  externalDocs: ExternalDocumentation;

}