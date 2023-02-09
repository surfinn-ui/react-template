import { ApiBase } from './api.base';

class MyappApi extends ApiBase {
  baseUrl = '/myapp';

  // Additional methods goes hear
}

export const myappApi = new MyappApi();
