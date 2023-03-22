import { Operation } from "./OperationObject";
import { Parameter } from "./ParameterObject";
import { Server } from "./ServerObject";

export class PathItem {
  $ref?: string;
  summary?: string;
  description?: string;
  get?: Operation;
  put?: Operation;
  post?: Operation;
  delete?: Operation;
  options?: Operation;
  head?: Operation;
  patch?: Operation;
  trace?: Operation;
  servers?: Server[];
  parameters?: Parameter[];
}