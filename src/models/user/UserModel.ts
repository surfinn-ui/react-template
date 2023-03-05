import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from '../withSetPropAction';

const UserProps = {
  id: types.maybeNull(types.identifierNumber), // undefined
  username: types.maybeNull(types.string), // undefined
  firstName: types.maybeNull(types.string), // undefined
  lastName: types.maybeNull(types.string), // undefined
  email: types.maybeNull(types.string), // undefined
  password: types.maybeNull(types.string), // undefined
  phone: types.maybeNull(types.string), // undefined
  userStatus: types.maybeNull(types.number), // undefined
};

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model('User', UserProps)
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IUserModel extends Instance<typeof UserModel> {} // prettier-ignore
export interface IUserModelSnapshotOut extends SnapshotOut<typeof UserModel> {} // prettier-ignore
export interface IUserModelSnapshotIn extends SnapshotIn<typeof UserModel> {} // prettier-ignore
export type TUserModelKeys = keyof IUserModelSnapshotIn & string; // prettier-ignore
