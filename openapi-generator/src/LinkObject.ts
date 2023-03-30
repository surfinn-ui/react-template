import { Server } from "./ServerObject";

export class Link {
  operationRef?: string;
  operationId?: string;
  parameters?: Map<string, any>;
  requestBody?: any;
  description?: string;
  server?: Server;
}