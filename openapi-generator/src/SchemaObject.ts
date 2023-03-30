import { Discriminator } from './DiscriminatorObject';
import { ExternalDocumentation } from './ExternalDocumentationObject';
import { XML } from './XMLObject';

export class Schema {
  discriminator?: Discriminator;
  xml?: XML;
  externalDocs?: ExternalDocumentation;
  example?: any;
}
