interface IExtensible extends Record<string, any> {}

export abstract class Extensible implements IExtensible {
  [key: string]: any;

  getProp(key: string) {
    return this[key];
  }

  setProp(key: string, value: any) {
    if (!key.startsWith('x-')) {
      if (!Object.keys(this).includes(key)) {
        throw new Error(`Property ${key} already exists`);
      } 
    }
    this[key] = value;
  }
}
