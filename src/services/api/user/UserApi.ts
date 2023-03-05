import { ApiBase } from '../ApiBase';
import { IPagination } from '../../models/withPagination';
import {
  Model,
  IUserModel,
  IUserModelSnapshotIn,
} from '../../models/user/UserModel';
import { IUserModel } from '../../../models/User/UserModel';

export interface IUserApiSearchParams extends IUserModel, IPagination {}

/**
 * UserApi
 */
class UserApi extends ApiBase {
  private BASE_URL = `/user`;

  /**
   * ## Get user by user name
   *
   * @param {string} username **(REQUIRED)** The name that needs to be fetched. Use user1 for testing.
   * @returns
   */
  async getUserByName(username: string) {
    return this.find<IUserModel>(`${this.url}/${username}`);
  }

  /**
   * ## Update user
   * This can only be done by the logged in user.
   * @param {string} username **(REQUIRED)** name that need to be deleted
   * @param {any} payload **(REQUIRED)**
   * @returns
   */
  async updateUser(username: string, payload: any) {
    return this.update<any>(`${this.url}/${username}`, payload);
  }

  /**
   * ## Delete user
   * This can only be done by the logged in user.
   * @param {string} username **(REQUIRED)** The name that needs to be deleted
   * @returns
   */
  async deleteUser(username: string) {
    return this.delete<any>(`${this.url}/${username}`);
  }

  /**
   * ## Logs out current logged in user session
   *
   *
   * @returns
   */
  async logoutUser() {
    return this.find<any>(`${this.url}/logout`);
  }

  /**
   * ## Logs user into the system
   *
   * @param {string} [username]  The user name for login
   * @param {string} [password]  The password for login in clear text
   * @returns
   */
  async loginUser(username?: string, password?: string) {
    return this.find<any>(
      `${this.url}/login?username=${username}&password=${password}`,
    );
  }

  /**
   * ## Creates list of users with given input array
   * Creates list of users with given input array
   * @param {IUserModel[]} payload **(REQUIRED)**
   * @returns
   */
  async createUsersWithListInput(payload: IUserModel[]) {
    return this.create<IUserModel>(`${this.url}/createWithList`, payload);
  }

  /**
   * ## Create user
   * This can only be done by the logged in user.
   * @param {any} payload **(REQUIRED)**
   * @returns
   */
  async createUser(payload: any) {
    return this.create<IUserModel>(`${this.url}`, payload);
  }
}

export const userApi = new UserApi();
