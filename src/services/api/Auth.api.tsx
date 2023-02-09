import Axios from 'axios';
import Base64 from '../../utils/Base64';

class AuthApi {
  async requestRefresh(refreshToken: string): Promise<string> {
    const params = new URLSearchParams();
    params.append('refresh_token', refreshToken);
    params.append('grant_type', 'refresh_token');
    params.append('scope', 'read,write');
    // Important! Do NOT use the axios instance that you supplied to applyAuthTokenInterceptor
    // because this will result in an infinite loop when trying to refresh the token.
    // Use the global axios client or a different instance
    const response = await Axios.post(import.meta.env.AUTH_API_URL, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          `Basic ` +
          Base64.btoa(
            `${import.meta.env.AUTH_API_CLIENT_ID}:${
              import.meta.env.AUTH_API_CLIENT_SECRET
            }`
          ),
      },
      timeout: import.meta.env.AUTH_API_TIMEOUT,
    });
    return response.data.access_token;
  }
}

export const authApi = new AuthApi();
