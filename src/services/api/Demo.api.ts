import { ApiBase } from './api.base';
import { IDemoModel } from '../../models/Demo.model';

class DemoApi extends ApiBase {
  url = '/demo';

  async listDemo(params?: string | { [key: string]: any }) {
    if (typeof params === 'string') {
      return this.getAll<IDemoModel>(params);
    }
    return this.getAll<IDemoModel>(this.url, params);
  }

  async getDemo(id: number) {
    return this.get<IDemoModel>(`${this.url}/${id}`);
  }

  async postDemo(data: IDemoModel) {
    return this.post<IDemoModel>(this.url, data);
  }

  async putDemo(id: number, data: IDemoModel) {
    return this.put<IDemoModel>(`${this.url}/${id}`, data);
  }

  async patchDemo(id: number, data: IDemoModel) {
    return this.patch<IDemoModel>(`${this.url}/${id}`, data);
  }

  async deleteDemo(id: number) {
    return this.delete(`${this.url}/${id}`);
  }

  // Additional methods goes hear
}

export const demoApi = new DemoApi();
