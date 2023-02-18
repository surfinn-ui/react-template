import {
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { withSetPropAction } from '../models/withSetPropAction';
import {
  TDeleteResult,
  TGetResult,
  TListResult,
  TPatchResult,
  TPostResult,
  TPutResult,
} from '../services/api';
import { userApi } from '../services/api/User.api';
import { FetchStates, withFetchStates } from './withFetchStates';
import { withPagination } from './withPagination';
// ^ generated dependencies by openapi-generator
// $ generated dependencies by openapi-generator

/**
 * Store description here for TypeScript hints.
 */
export const UserStore = types
  .model('UserStore')
  .props({
    // ^ generated props by openapi-generator
    // $ generated props by openapi-generator
  })
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
    // updaters

    return {
      // ^ generated actions by openapi-generator

      /**
       * ## Get user by user name
       *
       * @tags `user`
       * @param {string} username **REQUIRED**  The name that needs to be fetched. Use user1 for testing.
       */
      getUserByName: flow(function* (username: string) {
        self.setFetchState(FetchStates.PENDING);
        const response = yield userApi.getUserByName(username);
        if (response.kind === 'ok') {
          self.setFetchState(FetchStates.DONE);
          return response.data.data as any;
        } else {
          self.setFetchState(FetchStates.ERROR);
          console.error(response.kind);
        }
      }),

      /**
       * ## Update user
       * This can only be done by the logged in user.
       * @tags `user`
       * @param {string} username **REQUIRED**  name that need to be deleted
       * @param {any} payload  {any} Update an existent user in the store
       */
      updateUser: flow(function* (username: string, payload: any) {
        self.setFetchState(FetchStates.PENDING);
        const response = yield userApi.updateUser(username, payload);
        if (response.kind === 'ok') {
          self.setFetchState(FetchStates.DONE);
          return response.data.data as any;
        } else {
          self.setFetchState(FetchStates.ERROR);
          console.error(response.kind);
        }
      }),

      /**
       * ## Delete user
       * This can only be done by the logged in user.
       * @tags `user`
       * @param {string} username **REQUIRED**  The name that needs to be deleted
       */
      deleteUser: flow(function* (username: string) {
        self.setFetchState(FetchStates.PENDING);
        const response = yield userApi.deleteUser(username);
        if (response.kind === 'ok') {
          self.setFetchState(FetchStates.DONE);
          return response.data.data as any;
        } else {
          self.setFetchState(FetchStates.ERROR);
          console.error(response.kind);
        }
      }),

      /**
       * ## Logs out current logged in user session
       *
       * @tags `user`
       *
       */
      logoutUser: flow(function* () {
        self.setFetchState(FetchStates.PENDING);
        const response = yield userApi.logoutUser();
        if (response.kind === 'ok') {
          self.setFetchState(FetchStates.DONE);
          return response.data.data as any;
        } else {
          self.setFetchState(FetchStates.ERROR);
          console.error(response.kind);
        }
      }),

      /**
       * ## Logs user into the system
       *
       * @tags `user`
       * @param {string} username   The user name for login
       * @param {string} password   The password for login in clear text
       */
      loginUser: flow(function* (username: string, password: string) {
        self.setFetchState(FetchStates.PENDING);
        const response = yield userApi.loginUser(username, password);
        if (response.kind === 'ok') {
          self.setFetchState(FetchStates.DONE);
          return response.data.data as any;
        } else {
          self.setFetchState(FetchStates.ERROR);
          console.error(response.kind);
        }
      }),

      /**
       * ## Creates list of users with given input array
       * Creates list of users with given input array
       * @tags `user`
       * @param {any} payload  {any}
       */
      createUsersWithListInput: flow(function* (payload: any) {
        self.setFetchState(FetchStates.PENDING);
        const response = yield userApi.createUsersWithListInput(payload);
        if (response.kind === 'ok') {
          self.setFetchState(FetchStates.DONE);
          return response.data.data as any;
        } else {
          self.setFetchState(FetchStates.ERROR);
          console.error(response.kind);
        }
      }),

      /**
       * ## Create user
       * This can only be done by the logged in user.
       * @tags `user`
       * @param {any} payload  {any} Created user object
       */
      createUser: flow(function* (payload: any) {
        self.setFetchState(FetchStates.PENDING);
        const response = yield userApi.createUser(payload);
        if (response.kind === 'ok') {
          self.setFetchState(FetchStates.DONE);
          return response.data.data as any;
        } else {
          self.setFetchState(FetchStates.ERROR);
          console.error(response.kind);
        }
      }),

      // $ generated actions by openapi-generator
    };
  })
  // CUSTOM ACTIONS
  .actions((self) => ({}));

export interface IUserStore extends Instance<typeof UserStore> {}
export interface IUserSnapshotOut extends SnapshotOut<typeof UserStore> {}
export interface IUserStoreSnapshotIn extends SnapshotIn<typeof UserStore> {}
export type TUserStorePropKeys = keyof IUserStoreSnapshotIn & string;
