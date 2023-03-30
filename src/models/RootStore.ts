import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { LoadingStore } from './LoadingStore';

// ^ generated store imports
// $ generated store imports

// ----------------------------------------------------------------------------

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStore = types
  .model('RootStore')
  .props({
    loadingStore:            types.optional(LoadingStore, {}),
    // ^ generated store props
    // $ generated store props
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
