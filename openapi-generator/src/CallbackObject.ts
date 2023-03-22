import { PathItem } from "./PathItemObject";
import { Reference } from "./ReferenceObject";


export class Callback extends Map<string, PathItem | Reference>{
  // {expression} 
  // [key: string]: PathItem | Reference;
}