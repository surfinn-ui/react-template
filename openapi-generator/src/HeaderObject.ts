import { Example } from "./ExampleObject";
import { Reference } from "./ReferenceObject";
import { Schema } from "./SchemaObject";

export class Header {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: Schema;
  example?: any;
  examples?: Map<string, Example | Reference>;
}