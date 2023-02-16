import { ApiResponse } from 'apisauce';
import { AxiosRequestConfig } from 'axios';
import { api } from './api';
import { getGeneralApiProblem } from './api.problem';
import {
  TApiOkResponse,
  TApiResponse,
  TDeleteOkResult,
  TDeleteResult,
  TGetOkResult,
  TGetResult,
  TListOkResult,
  TListResult,
  TPatchResult,
  TPostResult,
  TPutResult,
  TSaveOkResult,
} from './api.types';

type TParams = { [key: string]: any } | undefined;

export class ApiBase {
  url: string = '';

  /**
   * 단건 조회
   * @param url 조회 URL
   * @returns
   */
  async getOne<T>(
    url: string,
    params?: TParams,
    config?: AxiosRequestConfig,
  ): Promise<TGetResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.get(
      url,
      params,
      config,
    );

    const problem = getGeneralApiProblem(response);
    if (problem) return problem;

    const data = response.data as TApiOkResponse<T>;
    return { kind: 'ok', data } as TGetOkResult<T>;
  }

  /**
   * 목록 조회
   * @param url 조회 URL
   * @returns
   */
  async getAll<T>(
    url: string,
    params?: TParams,
    config?: AxiosRequestConfig,
  ): Promise<TListResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.get(
      url,
      params,
      config,
    );

    const problem = getGeneralApiProblem(response);
    if (problem) return problem;

    const data = response.data as TApiOkResponse<T>;
    return {
      kind: 'ok',
      data: data.results,
      pagination: data.pagination,
    } as TListOkResult<T>;
  }

  /**
   * 새로운 데이터 생성
   * @param url
   * @param payload
   * @returns
   */
  async post<T>(
    url: string,
    payload?: any,
    config?: AxiosRequestConfig,
  ): Promise<TPostResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.post(
      url,
      payload,
      config,
    );

    const problem = getGeneralApiProblem(response);
    if (problem) return problem;

    const data = response.data as TApiOkResponse<T>;
    return { kind: 'ok', data } as TSaveOkResult<T>;
  }

  /**
   * 단건 속성 전체 수정
   * data에 정의되지 않은 속성은 기본값으로 변경
   * @param url
   * @param payload 저장할 모든 속성을 포함한 객체
   * @returns
   */
  async put<T>(
    url: string,
    payload?: any,
    config: AxiosRequestConfig = {},
  ): Promise<TPutResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.put(
      url,
      payload,
      config,
    );

    const problem = getGeneralApiProblem(response);
    if (problem) return problem;

    const data = response.data as TApiOkResponse<T>;
    return { kind: 'ok', data } as TSaveOkResult<T>;
  }

  /**
   * 단건 속성 일부 수정
   * payload에 정의되지 않은 속성은 변경되지 않음
   * @param url
   * @param payload 일부 속성만 포함한 객체
   * @returns
   */
  async patch<T>(
    url: string,
    payload?: TParams,
    config?: AxiosRequestConfig,
  ): Promise<TPatchResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.patch(
      url,
      payload,
      config,
    );

    const problem = getGeneralApiProblem(response);
    if (problem) return problem;

    const data = response.data as TApiOkResponse<T>;
    return { kind: 'ok', data } as TSaveOkResult<T>;
  }

  /**
   * 단건 삭제
   * @param url
   * @returns
   */
  async delete<T>(
    url: string,
    params?: TParams,
    config?: AxiosRequestConfig,
  ): Promise<TDeleteResult> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.delete(
      url,
      params,
      config,
    );

    const problem = getGeneralApiProblem(response);
    if (problem) return problem;

    return { kind: 'ok' } as TDeleteOkResult;
  }

  // -----------------------------------------------------------------------------------------
  /**
   * Fetch <%= props.pascalCaseName %>Models list
   *
   * @param Query parameters
   * @returns <%= props.pascalCaseName %>Model[]
   */
  async fetchAll<T>(params?: { [key: string]: any }) {
    return this.getAll<T>(this.url, params);
  }

  /**
   * Fetch a <%= props.pascalCaseName %>Model by id
   *
   * @param id of <%= props.pascalCaseName %>Model
   * @returns <%= props.pascalCaseName %>Model
   */
  async fetchById<T>(id: number) {
    return this.getOne<T>(`${this.url}/${id}`);
  }

  /**
   * Create a <%= props.pascalCaseName %>Model
   *
   * @param payload of <%= props.pascalCaseName %>Model
   * @returns
   */
  async create<T>(payload: Partial<T>) {
    return this.post<Partial<T>>(this.url, payload);
  }

  /**
   * Update a <%= props.pascalCaseName %>Model
   *
   * @param id of <%= props.pascalCaseName %>Model
   * @param payload of <%= props.pascalCaseName %>Model
   * @returns
   */
  async update<T>(id: number, payload: Partial<T>) {
    return this.put<Partial<T>>(`${this.url}/${id}`, payload);
  }

  /**
   * Patch a <%= props.pascalCaseName %>Model
   *
   * @param id of <%= props.pascalCaseName %>Model
   * @returns
   */
  async modify<T>(id: number, payload: Partial<T>) {
    return this.patch<Partial<T>>(`${this.url}/${id}`, payload);
  }

  /**
   * Remove a <%= props.pascalCaseName %>Model
   *
   * @param id of <%= props.pascalCaseName %>Model
   * @returns
   */
  async remove<T>(id: number) {
    return this.delete<T>(`${this.url}/${id}`);
  }

  /**
   * Remove <%= props.pascalCaseName %>Models list
   *
   * @param ids of <%= props.pascalCaseName %>Models
   * @returns
   */
  async removeAll<T>(ids: number[]) {
    return this.delete<T>(this.url, { ids });
  }
}
