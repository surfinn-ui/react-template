import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { Store } from './.store';
import { StoreStore } from './Store.store';
import { UserStore } from './User.store';
import { PetStore } from './Pet.store';

/**
 * A RootStore model.
 */
export const RootStore = types
  .model('RootStore')
  .props({
    // STORES
    petStore: types.optional(PetStore, {}),
    userStore: types.optional(UserStore, {}),
    store: types.optional(StoreStore, {}),
  })
  .actions((self) => ({}));

/**
 * The RootStore instance.
 */
export interface IRootStore extends Instance<typeof RootStore> {}

/**
 * The data of a RootStore.
 */
export interface IRootStoreSnapshot extends SnapshotOut<typeof RootStore> {}
