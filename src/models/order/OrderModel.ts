import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from '../withSetPropAction';

const OrderProps = {
  id: types.maybeNull(types.identifierNumber), // undefined
  petId: types.maybeNull(types.number), // undefined
  quantity: types.maybeNull(types.number), // undefined
  shipDate: types.maybeNull(types.string), // undefined
  status: types.maybeNull(types.string), // undefined
  complete: types.maybeNull(types.boolean), // undefined
};

/**
 * Model description here for TypeScript hints.
 */
export const OrderModel = types
  .model('Order', OrderProps)
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOrderModel extends Instance<typeof OrderModel> {} // prettier-ignore
export interface IOrderModelSnapshotOut extends SnapshotOut<typeof OrderModel> {} // prettier-ignore
export interface IOrderModelSnapshotIn extends SnapshotIn<typeof OrderModel> {} // prettier-ignore
export type TOrderModelKeys = keyof IOrderModelSnapshotIn & string; // prettier-ignore
