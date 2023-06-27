import { Instance, SnapshotOut, types } from 'mobx-state-tree';

// ^ generated store imports
import { UserStore } from './user/UserStore';
import { StoreStore } from './store/StoreStore';
import { PetStore } from './pet/PetStore';
// $ generated store imports

// ----------------------------------------------------------------------------

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStore = types
  .model('RootStore')
  .props({
    // ^ generated store props
    // $ generated store props
  })
  .actions((self) => ({}))
  .actions((self) => ({
    afterCreate() {
    }
  }));

/**
 * The RootStore instance.
 */
export interface IRootStore extends Instance<typeof RootStore> {}

/**
 * The data of a RootStore.
 */
export interface IRootStoreSnapshot extends SnapshotOut<typeof RootStore> {}
