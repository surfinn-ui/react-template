import { Header } from './HeaderObject';
import { Link } from './LinkObject';
import { MediaType } from './MediaTypeObject';
import { Reference } from './ReferenceObject';

export class Response {
  description: string;
  headers?: Map<string, Header | Reference>;
  content?: Map<string, MediaType>;
  links?: Map<string, Link | Reference>;
}
