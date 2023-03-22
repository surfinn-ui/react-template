import { ServerVariable } from "./ServerVariableObject";

export class Server {
  url: string;
  description?: string;
  variables?: Map<string, ServerVariable>;
}