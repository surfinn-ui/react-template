import { Callback } from "./CallbackObject";
import { Example } from "./ExampleObject";
import { Header } from "./HeaderObject";
import { Link } from "./LinkObject";
import { Parameter } from "./ParameterObject";
import { PathItem } from "./PathItemObject";
import { Reference } from "./ReferenceObject";
import { RequestBody } from "./RequestBodyObject";
import { Schema } from "./SchemaObject";
import { SecurityScheme } from "./SecuritySchemeObject";

export class Components {
  schemas?: Map<string, Schema>;
  responses?: Map<string, Response | Reference>;
  parameters?: Map<string, Parameter | Reference>;
  examples?: Map<string, Example | Reference>;
  requestBodies?: Map<string, RequestBody | Reference>;
  headers?: Map<string, Header | Reference>;
  securitySchemes?: Map<string, SecurityScheme | Reference>;
  links?: Map<string, Link | Reference>;
  callbacks?: Map<string, Callback | Reference>;
  pathItems?: Map<string, PathItem | Reference>;
}