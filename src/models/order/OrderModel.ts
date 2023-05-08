import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from '../withSetPropAction';
import { OrderModelProps } from './OrderModelProps';

/**
 * OrderModel
 *
 */
export const OrderModel = types
  .model('Order', {
    ...OrderModelProps,
    // add your own properties
  })
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOrderModel extends Instance<typeof OrderModel> {} // prettier-ignore
export interface IOrderModelSnapshotOut extends SnapshotOut<typeof OrderModel> {} // prettier-ignore
export interface IOrderModelSnapshotIn extends SnapshotIn<typeof OrderModel> {} // prettier-ignore
export type TOrderModelKeys = keyof IOrderModelSnapshotIn & string; // prettier-ignore
