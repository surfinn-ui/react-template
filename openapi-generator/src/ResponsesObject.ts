import { Reference } from './ReferenceObject';

export class Responses extends Map<string, Response | Reference> {
  default?: Response | Reference;
  // [key: string]: Response | Reference | undefined;
}
