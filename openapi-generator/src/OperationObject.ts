import { Callback } from "./CallbackObject";
import { Parameter } from "./ParameterObject";
import { Reference } from "./ReferenceObject";
import { RequestBody } from "./RequestBodyObject";
import { Responses } from "./ResponsesObject";
import { SecurityRequirement } from "./SecurityRequirementObject";
import { Server } from "./ServerObject";

export class Operation {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: External;
  /**
   * case-sensitive
   */
  operationId?: string;
  parameters?: Array<Parameter | Reference>;
  requestBody?: RequestBody;
  responses: Responses;
  callbacks?: Map<string, Callback | Reference>;
  deprecated?: boolean;
  security?: SecurityRequirement[];
  servers?: Server[];
}