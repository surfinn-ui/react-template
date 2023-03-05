import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from '../withSetPropAction';

const AddressProps = {
  street: types.maybeNull(types.string), // undefined
  city: types.maybeNull(types.string), // undefined
  state: types.maybeNull(types.string), // undefined
  zip: types.maybeNull(types.string), // undefined
};

/**
 * Model description here for TypeScript hints.
 */
export const AddressModel = types
  .model('Address', AddressProps)
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAddressModel extends Instance<typeof AddressModel> {} // prettier-ignore
export interface IAddressModelSnapshotOut extends SnapshotOut<typeof AddressModel> {} // prettier-ignore
export interface IAddressModelSnapshotIn extends SnapshotIn<typeof AddressModel> {} // prettier-ignore
export type TAddressModelKeys = keyof IAddressModelSnapshotIn & string; // prettier-ignore
