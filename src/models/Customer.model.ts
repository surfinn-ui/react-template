import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from './withSetPropAction';
import { AddressModel } from './Address.model';

/**
 * Model description here for TypeScript hints.
 */
export const CustomerModel = types
  .model('Customer')
  .props({
    id: types.maybeNull(types.identifier), // undefined | int64 | 100000 | undefined | undefined | undefined | undefined | undefined
    username: types.maybeNull(types.string), // undefined | undefined | fehguy | undefined | undefined | undefined | undefined | undefined
    address: types.maybeNull(types.array(AddressModel)), // undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined
  })
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICustomerModel extends Instance<typeof CustomerModel> {} // prettier-ignore
export interface ICustomerModelSnapshotOut extends SnapshotOut<typeof CustomerModel> {} // prettier-ignore
export interface ICustomerModelSnapshotIn extends SnapshotIn<typeof CustomerModel> {} // prettier-ignore
export type TCustomerModelKeys = keyof ICustomerModelSnapshotIn & string; // prettier-ignore
