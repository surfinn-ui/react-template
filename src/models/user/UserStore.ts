import {
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { withSetPropAction } from '../withSetPropAction';
import {
  TSearchResult,
  TFindResult,
  TCreateResult,
  TUpdateResult,
  TPartialUpdateResult,
  TDeleteResult,
} from '../../services/api';
import { userApi } from '../../services/api/user/UserApi';
import { FetchStates, withFetchStates } from '../withFetchStates';
import { withPagination } from '../withPagination';
// ^ generated dependencies by openapi-generator
// $ generated dependencies by openapi-generator

const UserStoreProps = {
  // ^ generated props by openapi-generator
  // $ generated props by openapi-generator
};

/**
 * Store description here for TypeScript hints.
 */
export const UserStore = types
  .model('UserStore', UserStoreProps)
  // Formatted Data
  .views((self) => ({}))
  .extend(withFetchStates) // Fetch State
  .extend(withPagination) // Pagination Information
  .actions(withSetPropAction) // Set Property Action
  // Update Store State
  .actions((self) => ({
    // ^ generated update state actions by openapi-generator
    // $ generated update state actions by openapi-generator
  }))
  // OPEN API GENERATOR ACTIONS
  .actions((self) => {
    // ^ generated actions by openapi-generator

    /**
     * ## Get user by user name
     *
     * @tags `user`
     * @param {string} username **REQUIRED**  The name that needs to be fetched. Use user1 for testing.
     */
    const getUserByName = flow(function* (username: string) {
      if (self.isPending) return;
      self.pending();
      const response = yield userApi.getUserByName(username);
      if (response.kind === 'ok') {
        self.done();
        return response.data.data as any;
      } else {
        self.error(response);
        console.error(response.kind);
      }
    });

    /**
     * ## Update user
     * This can only be done by the logged in user.
     * @tags `user`
     * @param {string} username **REQUIRED**  name that need to be deleted
     * @param {any} payload  {any} Update an existent user in the store
     */
    const updateUser = flow(function* (username: string, payload: any) {
      if (self.isPending) return;
      self.pending();
      const response = yield userApi.updateUser(username, payload);
      if (response.kind === 'ok') {
        self.done();
        return response.data.data as any;
      } else {
        self.error(response);
        console.error(response.kind);
      }
    });

    /**
     * ## Delete user
     * This can only be done by the logged in user.
     * @tags `user`
     * @param {string} username **REQUIRED**  The name that needs to be deleted
     */
    const deleteUser = flow(function* (username: string) {
      if (self.isPending) return;
      self.pending();
      const response = yield userApi.deleteUser(username);
      if (response.kind === 'ok') {
        self.done();
        return response.data.data as any;
      } else {
        self.error(response);
        console.error(response.kind);
      }
    });

    /**
     * ## Logs out current logged in user session
     *
     * @tags `user`
     *
     */
    const logoutUser = flow(function* () {
      if (self.isPending) return;
      self.pending();
      const response = yield userApi.logoutUser();
      if (response.kind === 'ok') {
        self.done();
        return response.data.data as any;
      } else {
        self.error(response);
        console.error(response.kind);
      }
    });

    /**
     * ## Logs user into the system
     *
     * @tags `user`
     * @param {string} username   The user name for login
     * @param {string} password   The password for login in clear text
     */
    const loginUser = flow(function* (username: string, password: string) {
      if (self.isPending) return;
      self.pending();
      const response = yield userApi.loginUser(username, password);
      if (response.kind === 'ok') {
        self.done();
        return response.data.data as any;
      } else {
        self.error(response);
        console.error(response.kind);
      }
    });

    /**
     * ## Creates list of users with given input array
     * Creates list of users with given input array
     * @tags `user`
     * @param {any} payload  {any}
     */
    const createUsersWithListInput = flow(function* (payload: any) {
      if (self.isPending) return;
      self.pending();
      const response = yield userApi.createUsersWithListInput(payload);
      if (response.kind === 'ok') {
        self.done();
        return response.data.data as any;
      } else {
        self.error(response);
        console.error(response.kind);
      }
    });

    /**
     * ## Create user
     * This can only be done by the logged in user.
     * @tags `user`
     * @param {any} payload  {any} Created user object
     */
    const createUser = flow(function* (payload: any) {
      if (self.isPending) return;
      self.pending();
      const response = yield userApi.createUser(payload);
      if (response.kind === 'ok') {
        self.done();
        return response.data.data as any;
      } else {
        self.error(response);
        console.error(response.kind);
      }
    });

    // $ generated actions by openapi-generator
    return {
      // ^ generated actions by openapi-generator
      // $ generated actions by openapi-generator
    };
  })
  // CUSTOM ACTIONS
  .actions((self) => ({}));

export interface IUserStore extends Instance<typeof UserStore> {}
export interface IUserSnapshotOut extends SnapshotOut<typeof UserStore> {}
export interface IUserStoreSnapshotIn extends SnapshotIn<typeof UserStore> {}
export type TUserStorePropKeys = keyof IUserStoreSnapshotIn & string;
