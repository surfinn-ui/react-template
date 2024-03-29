import { IPagination } from '@/models/withPagination';
import { TGeneralApiProblem } from './ApiProblem';

/**
 * The options used to configure apisauce.
 */
export interface IApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

/**
 * 목록 조회 결과
 */
export type TSearchOkResult<T> = {
  kind: 'ok';
  data: T[];
  pagination?: IPagination;
};
export type TSearchResult<T> = TSearchOkResult<T> | TGeneralApiProblem;

/**
 * 단건 조회 결과
 */
export type TFindOkResult<T> = {
  kind: 'ok';
  data: T;
  pagination?: IPagination;
};
export type TFindResult<T> = TFindOkResult<T> | TGeneralApiProblem;

/**
 * 생성 결과
 */
export type TCreateOkResult<T> = {
  kind: 'ok';
  data?: T | T[];
  pagination?: IPagination;
};
export type TCreateResult<T> = TCreateOkResult<T> | TGeneralApiProblem;

/**
 * 수정 결과
 */
export type TUpdateOkResult<T> = {
  kind: 'ok';
  data?: T | T[];
  pagination?: IPagination;
};
export type TUpdateResult<T> = TUpdateOkResult<T> | TGeneralApiProblem;
export type TPartialUpdateResult<T> = TUpdateOkResult<T> | TGeneralApiProblem;

/**
 * 삭제 결과
 */
export type TDeleteOkResult<T> = {
  kind: 'ok';
  data?: T | T[];
  pagination?: IPagination;
};
export type TDeleteResult<T> = TDeleteOkResult<T> | TGeneralApiProblem;

/**
 * 목록 조회, 단건 조회, 생성, 수정, 삭제 결과
 */
export type TResult<T> =
  | TSearchResult<T>
  | TFindResult<T>
  | TCreateResult<T>
  | TUpdateResult<T>
  | TPartialUpdateResult<T>
  | TDeleteResult<T>;

/**
 * RestApi 구현에 따라 다른 형태의 응답이 올 수 있으므로,
 * 이를 처리하기 위한 타입을 정의한다.
 *
 * get, list, post, put, patch, delete 메서드와 일치시킨다.
 *
 * `resultCode`는 RestApi 구현에서 헤더로 에러코드를 내리지 않고 별도 처리시 사용하는 코드이다.
 *
 */
export type TApiOkResponse<T> =
  | {
      resultCode: 'S';
      statusCode: string;
      data?: T | T[];
      pagination?: IPagination;
    } & T;

/**
 * RestApi 구현에 따라 다른 형태의 에러 응답이 올 수 있으므로,
 * 이를 처리하기 위한 타입을 정의한다.
 *
 * get, list, post, put, patch, delete 메서드와 일치시킨다.
 *
 * `resultCode`는 RestApi 구현에서 헤더로 에러코드를 내리지 않고 별도 처리시 사용하는 코드이다.
 */
export type TApiErrorResponse = {
  resultCode: 'F';
  errorCode?: string;
  name?: string;
  message?: string;
  detail?: any;
  error: string;
};

export type TApiResponse<T> = TApiErrorResponse | TApiOkResponse<T>;
