import { ApiBase } from './api.base';

import { IUserModel } from '../../models';

export class UserApi extends ApiBase {
  baseUrl = '/user';

  /**
   * 자신의 정보를 가져옵니다.
   * 사인인 시 사용합니다.
   *
   * @returns
   */
  async getMe() {
    return this.get<IUserModel>(`user/me`);
  }

  /**
   * 자신의 계정을 삭제합니다.
   * 회원 탈퇴를 의미합니다.
   *
   * @returns
   */
  async withdraw() {
    return this.delete<IUserModel>(`user/withdraw`);
  }

  async joining(user: IUserModel) {
    return this.post<IUserModel>(`user`, user);
  }

  async listUser(params?: string | { [key: string]: any }) {
    if (typeof params === 'string') {
      return this.getAll<IUserModel>(params);
    }
    return this.getAll<IUserModel>('user', params);
  }

  async getUser(id: number) {
    return this.get<IUserModel>(`user/${id}`);
  }

  async postUser(user: IUserModel) {
    return this.post<IUserModel>(`user`, user);
  }

  async putUser(id: number, user: IUserModel) {
    return this.put<IUserModel>(`user/${id}`, user);
  }

  async patchUser(id: number, user: IUserModel) {
    return this.patch<IUserModel>(`user/${id}`, user);
  }

  async deleteUser(id: number) {
    return this.delete(`user/${id}`);
  }
}

export const userApi = new UserApi();
