import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from '../withSetPropAction';
import { UserModelProps } from './UserModelProps';

/**
 * UserModel
 *
 */
export const UserModel = types
  .model('User', {
    ...UserModelProps,
    // add your own properties
  })
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IUserModel extends Instance<typeof UserModel> {} // prettier-ignore
export interface IUserModelSnapshotOut extends SnapshotOut<typeof UserModel> {} // prettier-ignore
export interface IUserModelSnapshotIn extends SnapshotIn<typeof UserModel> {} // prettier-ignore
export type TUserModelKeys = keyof IUserModelSnapshotIn & string; // prettier-ignore
