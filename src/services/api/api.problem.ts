import { ApiResponse } from 'apisauce';
import { TApiResponse, TApiErrorResponse } from './api.types';

export type TGeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: 'timeout'; temporary: true }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: 'cannot-connect'; temporary: true }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: 'server' }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: 'unauthorized' }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: 'forbidden' }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: 'not-found' }
  /**
   * All other 4xx series errors.
   */
  | { kind: 'rejected' }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: 'unknown'; temporary: true }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: 'bad-data' }

  /**
   * Additional error data from the server.
   * API Server 구현 정책에따라 200으로 내려오면서 에러 데이터를 전달하는 경우.
   */
  // | { kind: 'common'; detail: TApiErrorResponse }
  // | { kind: 'collect'; detail: TApiErrorResponse }
  // | { kind: 'correct'; detail: TApiErrorResponse }
  // | { kind: 'batch'; detail: TApiErrorResponse; temporary: true }
  // | { kind: 'service'; detail: TApiErrorResponse; temporary: true };
  | {
      kind: 'custom-server-error-no-handler__please-define-this-error-at__services/api/api.problem.ts';
      temporary: false;
    };

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem<T>(
  response: ApiResponse<TApiResponse<T> | null>,
): TGeneralApiProblem | void {
  if (!response.ok) {
    switch (response.problem) {
      case 'CONNECTION_ERROR':
        return { kind: 'cannot-connect', temporary: true };
      case 'NETWORK_ERROR':
        return { kind: 'cannot-connect', temporary: true };
      case 'TIMEOUT_ERROR':
        return { kind: 'timeout', temporary: true };
      case 'SERVER_ERROR':
        return { kind: 'server' };
      case 'UNKNOWN_ERROR':
        return { kind: 'unknown', temporary: true };
      case 'CLIENT_ERROR':
        switch (response.status) {
          case 401:
            return { kind: 'unauthorized' };
          case 403:
            return { kind: 'forbidden' };
          case 404:
            return { kind: 'not-found' };
          default:
            return { kind: 'rejected' };
        }
      case 'CANCEL_ERROR':
        return;
    }
  }

  // NOTE - api server에 따른 에러 처리를 추가할 수 있다.
  // API Server에서 강제로 200으로 내려보내면서 오류를 내려보낼 때 처리
  if (response.data?.resultCode !== 'S') {
    switch (response.data?.errorCode?.split('-')[1][0]) {
      // // 공통: 0000번대 (Http 에러코드 포함)
      // case '0':
      //   return { kind: 'common', detail: response.data };
      // // 수집: 1000번대
      // case '1':
      //   return { kind: 'collect', detail: response.data };
      // // 전처리: 2000번대
      // case '2':
      //   return { kind: 'correct', detail: response.data };
      // // 배치: 3000번대
      // case '3':
      //   return { kind: 'batch', detail: response.data, temporary: true };
      // // 서비스: 5000번대
      // case '5':
      //   return { kind: 'service', detail: response.data, temporary: true };

      default:
        return {
          kind: 'custom-server-error-no-handler__please-define-this-error-at__services/api/api.problem.ts',
          temporary: false,
        };
    }
  }

  return;
}
