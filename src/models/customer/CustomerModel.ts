import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from '../withSetPropAction';
import { AddressModel } from './AddressModel';

const CustomerProps = {
  id: types.maybeNull(types.identifierNumber), // undefined
  username: types.maybeNull(types.string), // undefined
  address: types.maybeNull(types.array(AddressModel)), // undefined
};

/**
 * Model description here for TypeScript hints.
 */
export const CustomerModel = types
  .model('Customer', CustomerProps)
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICustomerModel extends Instance<typeof CustomerModel> {} // prettier-ignore
export interface ICustomerModelSnapshotOut extends SnapshotOut<typeof CustomerModel> {} // prettier-ignore
export interface ICustomerModelSnapshotIn extends SnapshotIn<typeof CustomerModel> {} // prettier-ignore
export type TCustomerModelKeys = keyof ICustomerModelSnapshotIn & string; // prettier-ignore
