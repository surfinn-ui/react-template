import { Example } from './ExampleObject';
import { Schema } from './SchemaObject';

export class Parameter {
  name: string;
  in: 'path' | 'query' | 'header' | 'cookie';
  description?: string;
  required?: boolean = false;
  deprecated?: boolean = false;
  allowEmptyValue?: boolean = false;
  style?: string;
  explode?: boolean = false;
  allowReserved?: boolean = false;
  schema?: Schema;
  example?: any;
  examples?: Map<string, Example>;

  constructor(name: string, location: 'path' | 'query' | 'header' | 'cookie') {
    this.name = name;
    this.in = location;
    if (location === 'path') {
      this.required = true;
    }
  }
}
