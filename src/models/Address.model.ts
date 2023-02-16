import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from './withSetPropAction';

/**
 * Model description here for TypeScript hints.
 */
export const AddressModel = types
  .model('Address')
  .props({
    street: types.maybeNull(types.string), // undefined | undefined | 437 Lytton | undefined | undefined | undefined | undefined | undefined
    city: types.maybeNull(types.string), // undefined | undefined | Palo Alto | undefined | undefined | undefined | undefined | undefined
    state: types.maybeNull(types.string), // undefined | undefined | CA | undefined | undefined | undefined | undefined | undefined
    zip: types.maybeNull(types.string), // undefined | undefined | 94301 | undefined | undefined | undefined | undefined | undefined
  })
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAddressModel extends Instance<typeof AddressModel> {} // prettier-ignore
export interface IAddressModelSnapshotOut extends SnapshotOut<typeof AddressModel> {} // prettier-ignore
export interface IAddressModelSnapshotIn extends SnapshotIn<typeof AddressModel> {} // prettier-ignore
export type TAddressModelKeys = keyof IAddressModelSnapshotIn & string; // prettier-ignore
