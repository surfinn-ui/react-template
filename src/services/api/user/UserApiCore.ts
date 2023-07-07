import { ApiBase } from '../ApiBase';
import { IUserModel } from '@/models/user/UserModel';

/**
 * UserApiCore
 *
 * Do not edit this file directly, it is generated by openapi-generator.
 */
export class UserApiCore extends ApiBase {
  // ^ Apis generated by openapi-generator

  /**
   * ## Get user by user name
   *
   *
   * @param {string} username **(REQUIRED)** The name that needs to be fetched. Use user1 for testing.
   * @returns
   */
  public async getUserByName(username: string) {
    return this.find<IUserModel>(`/user/${username}`);
  }

  /**
   * ## Update user
   * This can only be done by the logged in user.
   *
   * @param {string} username **(REQUIRED)** name that need to be deleted
   * @param {IUserModel} payload  Update an existent user in the store
   * @returns
   */
  public async updateUser(username: string, payload: IUserModel) {
    return this.update(`/user/${username}`, payload);
  }

  /**
   * ## Delete user
   * This can only be done by the logged in user.
   *
   * @param {string} username **(REQUIRED)** The name that needs to be deleted
   * @returns
   */
  public async deleteUser(username: string) {
    return this.delete(`/user/${username}`);
  }

  /**
   * ## Logs out current logged in user session
   *
   *
   *
   * @returns
   */
  public async logoutUser() {
    return this.find(`/user/logout`);
  }

  /**
   * ## Logs user into the system
   *
   *
   * @param {string} [username]  The user name for login
   * @param {string} [password]  The password for login in clear text
   * @returns
   */
  public async loginUser(username?: string, password?: string) {
    const queries = new URLSearchParams();
    if (username) {
      queries.append('username', String(username));
    }
    if (password) {
      queries.append('password', String(password));
    }

    return this.find(`/user/login`, queries);
  }

  /**
   * ## Creates list of users with given input array
   * Creates list of users with given input array
   *
   * @param {Array<IUserModel>} payload
   * @returns
   */
  public async createUsersWithListInput(payload: Array<IUserModel>) {
    return this.create<IUserModel>(`/user/createWithList`, payload);
  }

  /**
   * ## Create user
   * This can only be done by the logged in user.
   *
   * @param {IUserModel} payload  Created user object
   * @returns
   */
  public async createUser(payload: IUserModel) {
    return this.create<IUserModel>(`/user`, payload);
  }
  // $ Apis generated by openapi-generator
}
