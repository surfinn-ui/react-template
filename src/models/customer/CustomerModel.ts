import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from '../withSetPropAction';
import { CustomerModelProps } from './CustomerModelProps';

/**
 * CustomerModel
 *
 */
export const CustomerModel = types
  .model('Customer', {
    ...CustomerModelProps,
    // add your own properties here
  })
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICustomerModel extends Instance<typeof CustomerModel> {} // prettier-ignore
export interface ICustomerModelSnapshotOut extends SnapshotOut<typeof CustomerModel> {} // prettier-ignore
export interface ICustomerModelSnapshotIn extends SnapshotIn<typeof CustomerModel> {} // prettier-ignore
export type TCustomerModelKeys = keyof ICustomerModelSnapshotIn & string; // prettier-ignore
