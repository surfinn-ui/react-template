import { ApiBase } from './api.base';
import { ITestModel } from "../../models/Test.model";

class TestApi extends ApiBase {
  url = '/test';

  /**
   * Fetch TestModels list
   *
   * @param Query parameters
   * @returns TestModel[]
   */
  async fetchAll(params?: { [key: string]: any }) {
    return this.getAll<ITestModel>(this.url, params);
  }

  /**
   * Fetch a TestModel by id
   *
   * @param id of TestModel
   * @returns TestModel
   */
  async fetchById(id: number) {
    return this.getOne<ITestModel>(`${this.url}/${id}`);
  }

  /**
   * Create a TestModel
   *
   * @param payload of TestModel
   * @returns 
   */
  async create(payload: Partial<ITestModel>) {
    return this.post<Partial<ITestModel>>(this.url, payload);
  }

  /**
    * Update a TestModel
    *
    * @param id of TestModel
    * @param payload of TestModel
    * @returns 
    */
  async update(id: number, payload: Partial<ITestModel>) {
    return this.put<Partial<ITestModel>>(`${this.url}/${id}`, payload);
  }

  /**
   * Patch a TestModel
   *
   * @param id of TestModel
   * @returns 
   */
  async modify(id: number, payload: Partial<ITestModel>) {
    return this.patch<Partial<ITestModel>>(`${this.url}/${id}`, payload);
  }

  /**
   * Remove a TestModel 
   *
   * @param id of TestModel
   * @returns 
   */
  async remove(id: number) {
    return this.delete(`${this.url}/${id}`);
  }

  /**
   * Remove TestModels list 
   *
   * @param ids of TestModels
   * @returns 
   */
  async removeAll(ids: number[]) {
    return this.delete(this.url, { ids });
  }

  // Please fill out the additional API method below.

}

export const testApi = new TestApi();
