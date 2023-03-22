import { ExternalDocumentation } from "./ExternalDocumentationObject";

export class Tag {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentation;
}