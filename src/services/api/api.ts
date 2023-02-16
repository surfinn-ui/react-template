/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { authApi } from './Auth.api';
import { ApisauceInstance, create } from 'apisauce';
import Axios, { AxiosInstance } from 'axios';
import { applyAuthTokenInterceptor, TokenRefreshRequest } from 'axios-jwt';
import type { IApiConfig } from './api.types';

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: IApiConfig = {
  url: import.meta.env.REACT_APP_API_URL,
  timeout: import.meta.env.REACT_APP_API_TIMEOUT,
};

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  axios: AxiosInstance;
  apisauce: ApisauceInstance;
  config: IApiConfig;

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: IApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.axios = Axios.create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: { Accept: 'application/json' },
    });

    const requestRefresh: TokenRefreshRequest = async (
      refreshToken: string,
    ): Promise<string> => {
      const token = await authApi.requestRefresh(refreshToken);
      return token;
    };

    applyAuthTokenInterceptor(this.axios, {
      requestRefresh, // async function that takes a refreshToken and returns a promise the resolves in a fresh accessToken
      header: 'Authorization', // header name
      headerPrefix: 'Bearer', // header value prefix
    });

    this.apisauce = create({
      axiosInstance: this.axios,
      baseURL: this.config.url,
    });

    // this.apisauce = create({
    //   baseURL: this.config.url,
    //   timeout: this.config.timeout,
    //   headers: {
    //     Accept: 'application/json',
    //   },
    // });
  }
}

// Singleton instance of the API for convenience
export const api = new Api();
