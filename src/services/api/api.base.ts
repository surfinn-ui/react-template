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

type TParams = { [key: string]: any };

export class ApiBase {
  /**
   * 단건 조회
   * @param url 조회 URL
   * @returns
   */
  async get<T>(
    url: string,
    params?: TParams,
    options: AxiosRequestConfig = {},
  ): Promise<TGetResult<T>> {
    console.tron.log('ApiBase.get()', url, params, options);
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.get(
      url,
      params,
      options,
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
    options: AxiosRequestConfig = {},
  ): Promise<TListResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.get(
      url,
      params,
      options,
    );

    const problem = getGeneralApiProblem(response);
    if (problem) return problem;

    const data = response.data as TApiOkResponse<T>;
    return {
      kind: 'ok',
      data: data.results,
      info: data.info,
    } as TListOkResult<T>;
  }

  /**
   * 새로운 데이터 생성
   * @param url
   * @param data
   * @returns
   */
  async post<T>(
    url: string,
    params?: T,
    options: AxiosRequestConfig = {},
  ): Promise<TPostResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.post(
      url,
      params,
      options,
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
   * @param data 저장할 모든 속성을 포함한 객체
   * @returns
   */
  async put<T>(
    url: string,
    params?: T,
    options: AxiosRequestConfig = {},
  ): Promise<TPutResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.put(
      url,
      params,
      options,
    );

    const problem = getGeneralApiProblem(response);
    if (problem) return problem;

    const data = response.data as TApiOkResponse<T>;
    return { kind: 'ok', data } as TSaveOkResult<T>;
  }

  /**
   * 단건 속성 일부 수정
   * data에 정의되지 않은 속성은 변경되지 않음
   * @param url
   * @param data 일부 속성만 포함한 객체
   * @returns
   */
  async patch<T>(
    url: string,
    params?: T,
    options: AxiosRequestConfig = {},
  ): Promise<TPatchResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.patch(
      url,
      params,
      options,
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
    options: AxiosRequestConfig = {},
  ): Promise<TDeleteResult> {
    const response: ApiResponse<TApiResponse<T>> = await api.apisauce.delete(
      url,
      params,
      options,
    );

    const problem = getGeneralApiProblem(response);
    if (problem) return problem;

    return { kind: 'ok' } as TDeleteOkResult;
  }
}
