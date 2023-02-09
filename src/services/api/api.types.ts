import { TGeneralApiProblem } from './api.problem';

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
export type TListOkResult<T> = {
  kind: 'ok';
  data: T[];
  info?: {
    count: number; // 전체 개수
    amount: number; // 페이지당 개수
    page: number; // 현재 페이지
    pages: number; // 전체 페이지 수
    next?: string | null; // 다음 페이지 URL
    prev?: string | null; // 이전 페이지 URL
  };
};
export type TListResult<T> = TListOkResult<T> | TGeneralApiProblem;

/**
 * 상세 조회 결과
 */
export type TGetOkResult<T> = { kind: 'ok'; data: T; info?: never };
export type TGetResult<T> = TGetOkResult<T> | TGeneralApiProblem;

/**
 * 생성 결과
 */
export type TSaveOkResult<T> = { kind: 'ok'; data: T; info?: never };
export type TSaveResult<T> = TSaveOkResult<T> | TGeneralApiProblem;
export type TPostResult<T> = TSaveResult<T>;

/**
 * 수정 결과
 */
export type TPutResult<T> = TSaveResult<T>;
export type TPatchResult<T> = TSaveResult<T>;

/**
 * 삭제 결과
 */
export type TDeleteOkResult = { kind: 'ok'; data: never; info: never };
export type TDeleteResult = TDeleteOkResult | TGeneralApiProblem;

export type TResult<T> =
  | TListResult<T>
  | TGetResult<T>
  | TSaveResult<T>
  | TDeleteResult;

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
      results?: T[];
      info?: {
        count: number; // 전체 개수
        pages: number; // 전체 페이지 수
        next: string | null; // 다음 페이지 URL
        prev: string | null; // 이전 페이지 URL
        // amount?: number; // 페이지당 개수
        // page?: number; // 현재 페이지
      };
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

/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface EpisodeItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: {
    link: string;
    type: string;
    length: number;
    duration: number;
    rating: { scheme: string; value: string };
  };
  categories: string[];
}

export interface ApiFeedResponse {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: EpisodeItem[];
}
