import { Header } from './HeaderObject';
import { Reference } from './ReferenceObject';

export class Encoding {
  _contentType?: string;
  headers?: Map<string, Header | Reference>;
  style?: string;
  explode?: boolean = false;
  allowReserved?: boolean = false;

  get contentType(): string | undefined {
    return this._contentType;
  }

  set contentType(contentType: string | undefined) {
    this._contentType = contentType;
    if (
      contentType === 'application/x-www-form-urlencoded' ||
      contentType === 'multipart/form-data'
    ) {
      this.style = 'form';
      this.explode = true;
      this.allowReserved = false;
    } else {
      this.style = undefined;
      this.allowReserved = undefined;
    }
  }
}
