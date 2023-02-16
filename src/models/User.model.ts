import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from './withSetPropAction';

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model('User')
  .props({
    id: types.maybeNull(types.identifierNumber), // undefined | int64 | 10 | undefined | undefined | undefined | undefined | undefined
    username: types.maybeNull(types.string), // undefined | undefined | theUser | undefined | undefined | undefined | undefined | undefined
    firstName: types.maybeNull(types.string), // undefined | undefined | John | undefined | undefined | undefined | undefined | undefined
    lastName: types.maybeNull(types.string), // undefined | undefined | James | undefined | undefined | undefined | undefined | undefined
    email: types.maybeNull(types.string), // undefined | undefined | john@email.com | undefined | undefined | undefined | undefined | undefined
    password: types.maybeNull(types.string), // undefined | undefined | 12345 | undefined | undefined | undefined | undefined | undefined
    phone: types.maybeNull(types.string), // undefined | undefined | 12345 | undefined | undefined | undefined | undefined | undefined
    userStatus: types.maybeNull(types.number), // undefined | int32 | 1 | undefined | undefined | undefined | undefined | undefined
  })
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IUserModel extends Instance<typeof UserModel> {} // prettier-ignore
export interface IUserModelSnapshotOut extends SnapshotOut<typeof UserModel> {} // prettier-ignore
export interface IUserModelSnapshotIn extends SnapshotIn<typeof UserModel> {} // prettier-ignore
export type TUserModelKeys = keyof IUserModelSnapshotIn & string; // prettier-ignore
