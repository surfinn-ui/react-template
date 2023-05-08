import { ApiResponse } from 'apisauce';
import { AxiosRequestConfig } from 'axios';
import { api } from './Api';
import { getGeneralApiProblem, TGeneralApiProblem } from './ApiProblem';
import {
  TApiOkResponse,
  TApiResponse,
  TCreateOkResult,
  TCreateResult,
  TDeleteOkResult,
  TDeleteResult,
  TFindOkResult,
  TFindResult,
  TPartialUpdateResult,
  TSearchOkResult,
  TSearchResult,
  TUpdateResult,
} from './ApiTypes';

type TParams = Record<string, any> | undefined;

export class ApiBase {
  /**
   * 단건 조회
   * @param url 조회 URL
   * @returns
   */
  async find<T>(
    url: string,
    params?: TParams,
    config?: AxiosRequestConfig,
  ): Promise<TFindResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.get(
      url,
      params,
      config,
    );

    const problem = getGeneralApiProblem(response);
    if (problem) {
      log<T>('Find', response, problem);
      return problem;
    }

    const data = response.data as TApiOkResponse<T>;
    return { kind: 'ok', data } as TFindOkResult<T>;
  }

  /**
   * 목록 조회
   * @param url 조회 URL
   * @returns
   */
  async search<T>(
    url: string,
    params?: TParams,
    config?: AxiosRequestConfig,
  ): Promise<TSearchResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.get(
      url,
      params,
      config,
    );

    const problem = getGeneralApiProblem(response);
    if (problem) {
      log<T>('Search', response, problem);
      return problem;
    }

    const result = response.data as TApiOkResponse<T>;

    return {
      kind: 'ok',
      data: result.data,
      pagination: result.pagination,
    } as TSearchOkResult<T>;
  }

  /**
   * 새로운 데이터 생성
   * @param url
   * @param payload
   * @returns
   */
  async create<T>(
    url: string,
    payload?: any,
    config?: AxiosRequestConfig,
  ): Promise<TCreateResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.post(
      url,
      payload,
      config,
    );

    const problem = getGeneralApiProblem(response);
    if (problem) {
      log<T>('Create', response, problem);
      return problem;
    }

    const result = response.data as TApiOkResponse<T>;
    return { kind: 'ok', data: result.data } as TCreateOkResult<T>;
  }

  /**
   * 단건 속성 전체 수정
   * data에 정의되지 않은 속성은 기본값으로 변경
   * @param url
   * @param payload 저장할 모든 속성을 포함한 객체
   * @returns
   */
  async update<T>(
    url: string,
    payload?: any,
    config: AxiosRequestConfig = {},
  ): Promise<TUpdateResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.put(
      url,
      payload,
      config,
    );

    const problem = getGeneralApiProblem(response);
    if (problem) {
      log<T>('Update', response, problem);
      return problem;
    }

    const result = response.data as TApiOkResponse<T>;
    return { kind: 'ok', data: result.data } as TCreateOkResult<T>;
  }

  /**
   * 단건 속성 일부 수정
   * payload에 정의되지 않은 속성은 변경되지 않음
   * @param url
   * @param payload 일부 속성만 포함한 객체
   * @returns
   */
  async partial<T>(
    url: string,
    payload?: TParams,
    config?: AxiosRequestConfig,
  ): Promise<TPartialUpdateResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.patch(
      url,
      payload,
      config,
    );

    const problem = getGeneralApiProblem(response);
    if (problem) {
      log<T>('Partial update', response, problem);
      return problem;
    }

    const result = response.data as TApiOkResponse<T>;
    return { kind: 'ok', data: result.data } as TCreateOkResult<T>;
  }

  /**
   * 단건 삭제
   *
   * @param url
   * @returns
   */
  async delete<T>(
    url: string,
    params?: TParams,
    config?: AxiosRequestConfig,
  ): Promise<TDeleteResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.delete(
      url,
      params,
      config,
    );

    const problem = getGeneralApiProblem(response);
    if (problem) {
      log<T>('Remove', response, problem);
      return problem;
    }

    const result = response.data as TApiOkResponse<T>;
    return { kind: 'ok', data: result.data } as TDeleteOkResult<T>;
  }
}

/**
 *
 * @param name
 * @param response
 * @param problem
 */
// prettier-ignore
function log<T>(
  name: string,
  response: ApiResponse<TApiResponse<T>>,
  problem: TGeneralApiProblem,
) {
  console.groupCollapsed(name);
    console.groupCollapsed('Response');
      console.log(JSON.stringify(response, null, 2));
    console.groupEnd();

    console.groupCollapsed('Problem');
      console.log(JSON.stringify(problem, null, 2));
    console.groupEnd();

    console.trace('Stack Trace');
  console.groupEnd();
}
