import { ApiBase } from './api.base';
import { IUserModel } from '../../models/User.model';

class UserApi extends ApiBase {
  url = '/user';

  /**
   * ## Get user by user name
   *
   * @param {string} username **(REQUIRED)** The name that needs to be fetched. Use user1 for testing.
   * @returns
   */
  async getUserByName(username: string) {
    return this.getOne<IUserModel>(`${this.url}/${username}`);
  }

  /**
   * ## Update user
   * This can only be done by the logged in user.
   * @param {string} username **(REQUIRED)** name that need to be deleted
   * @param {any} payload **(REQUIRED)**
   * @returns
   */
  async updateUser(username: string, payload: any) {
    return this.put<any>(`${this.url}/${username}`, payload);
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
    return this.getOne<any>(`${this.url}/logout`);
  }

  /**
   * ## Logs user into the system
   *
   * @param {string} [username]  The user name for login
   * @param {string} [password]  The password for login in clear text
   * @returns
   */
  async loginUser(username?: string, password?: string) {
    return this.getOne<any>(
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
    return this.post<IUserModel>(`${this.url}/createWithList`, payload);
  }

  /**
   * ## Create user
   * This can only be done by the logged in user.
   * @param {any} payload **(REQUIRED)**
   * @returns
   */
  async createUser(payload: any) {
    return this.post<IUserModel>(`${this.url}`, payload);
  }
}

export const userApi = new UserApi();
