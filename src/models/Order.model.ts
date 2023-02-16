import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from './withSetPropAction';

/**
 * Model description here for TypeScript hints.
 */
export const OrderModel = types
  .model('Order')
  .props({
    id: types.maybeNull(types.identifier), // undefined | int64 | 10 | undefined | undefined | undefined | undefined | undefined
    petId: types.maybeNull(types.number), // undefined | int64 | 198772 | undefined | undefined | undefined | undefined | undefined
    quantity: types.maybeNull(types.number), // undefined | int32 | 7 | undefined | undefined | undefined | undefined | undefined
    shipDate: types.maybeNull(types.string), // undefined | date-time | undefined | undefined | undefined | undefined | undefined | undefined
    status: types.maybeNull(types.string), // undefined | undefined | approved | undefined | undefined | undefined | undefined | undefined
    complete: types.maybeNull(types.boolean), // undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined
  })
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOrderModel extends Instance<typeof OrderModel> {} // prettier-ignore
export interface IOrderModelSnapshotOut extends SnapshotOut<typeof OrderModel> {} // prettier-ignore
export interface IOrderModelSnapshotIn extends SnapshotIn<typeof OrderModel> {} // prettier-ignore
export type TOrderModelKeys = keyof IOrderModelSnapshotIn & string; // prettier-ignore
