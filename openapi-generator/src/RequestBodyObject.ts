import { MediaType } from "./MediaTypeObject";

export class RequestBody {
  description?: string;
  content: Map<string, MediaType>;
  required?: boolean = false;
}