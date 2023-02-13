import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { TestStore } from './Test.store';
import { ConfigStore } from './Config.store';

/**
 * A RootStore model.
 */
export const RootStore = types
  .model('RootStore')
  .props({
    // CONFIGS
    configStore: types.optional(ConfigStore, {}),
    // STORES
  })
  .actions((self) => ({

  }));

/**
 * The RootStore instance.
 */
export interface IRootStore extends Instance<typeof RootStore> {}

/**
 * The data of a RootStore.
 */
export interface IRootStoreSnapshot extends SnapshotOut<typeof RootStore> {}
