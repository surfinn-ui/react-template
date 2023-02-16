import { ApiBase } from './api.base';
import { IUserModel } from '../../models/User.model';

class UserApi extends ApiBase {
  url = '/user';

  /**
   * Get user by user name
   *
   * @param username  *string* **(REQUIRED)** , in path. The name that needs to be fetched. Use user1 for testing.
   * @returns
   */
  async getUserByName(username: string) {
    return this.getOne<IUserModel>(`/user/${username}`);
  }

  /**
   * Update user
   * This can only be done by the logged in user.
   * @param username  *string* **(REQUIRED)** , in path. name that need to be deleted
   * @returns
   */
  async updateUser(username: string) {
    return this.put<any>(`/user/${username}`);
  }

  /**
   * Delete user
   * This can only be done by the logged in user.
   * @param username  *string* **(REQUIRED)** , in path. The name that needs to be deleted
   * @returns
   */
  async deleteUser(username: string) {
    return this.delete<any>(`/user/${username}`);
  }

  /**
   * Logs out current logged in user session
   * 

    * @returns
    */
  async logoutUser() {
    return this.getOne<any>(`/user/logout`);
  }

  /**
   * Logs user into the system
   *
   * @param username  *string*, in query. The user name for login
   * @param password  *string*, in query. The password for login in clear text
   * @returns
   */
  async loginUser(username: string, password: string) {
    return this.getOne<any>(
      `/user/login?username=${username}&password=${password}`,
    );
  }

  /**
   * Creates list of users with given input array
   * Creates list of users with given input array

    * @returns
    */
  async createUsersWithListInput() {
    return this.post<IUserModel>(`/user/createWithList`);
  }

  /**
   * Create user
   * This can only be done by the logged in user.

    * @returns
    */
  async createUser() {
    return this.post<IUserModel>(`/user`);
  }
}

export const userApi = new UserApi();
