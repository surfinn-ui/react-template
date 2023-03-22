import { Encoding } from "./EncodingObject";
import { Example } from "./ExampleObject";
import { Schema } from "./SchemaObject";

export class MediaType {
  schema?: Schema;
  example?: any;
  examples?: Map<string, Example>;
  encoding?: Map<string, Encoding>;
}