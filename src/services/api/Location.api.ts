import { ApiBase } from './api.base';
import { ILocationModel } from '../../models/Location.model';

class LocationApi extends ApiBase {
  url = '/location';

  async listLocation(params?: string | { [key: string]: any }) {
    if (typeof params === 'string') {
      return this.getAll<ILocationModel>(params);
    }
    return this.getAll<ILocationModel>(this.url, params);
  }

  async getLocation(id: number) {
    return this.get<ILocationModel>(`${this.url}/${id}`);
  }

  async postLocation(data: ILocationModel) {
    return this.post<ILocationModel>(this.url, data);
  }

  async putLocation(id: number, data: ILocationModel) {
    return this.put<ILocationModel>(`${this.url}/${id}`, data);
  }

  async patchLocation(id: number, data: ILocationModel) {
    return this.patch<ILocationModel>(`${this.url}/${id}`, data);
  }

  async deleteLocation(id: number) {
    return this.delete(`${this.url}/${id}`);
  }

  // Additional methods goes hear
}

export const locationApi = new LocationApi();
