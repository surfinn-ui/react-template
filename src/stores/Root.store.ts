import { Instance, SnapshotOut, types } from 'mobx-state-tree';

/**
 * A RootStore model.
 */
export const RootStore = types
  .model('RootStore')
  .props({
    // CONFIGS
    isFirstTime: types.optional(types.boolean, true),
    statusbar: types.optional(types.boolean, true),
    statusbarStyle: types.optional(
      types.enumeration(['light-content', 'dark-content', 'default']),
      'default',
    ),
    screenDirection: types.optional(types.enumeration(['ltr', 'rtl']), 'ltr'),
    header: types.optional(types.boolean, true),
    // STORES
    
  })
  .actions((self) => ({
    firstTimeDone() {
      self.isFirstTime = false;
    },
    showStatusbar() {
      self.statusbar = true;
    },
    hideStatusbar() {
      self.statusbar = false;
    },
    setScreenDirection(direction: 'ltr' | 'rtl') {
      self.screenDirection = direction;
    },
    showHeader() {
      self.header = true;
    },
    hideHeader() {
      self.header = false;
    },
  }));

/**
 * The RootStore instance.
 */
export interface IRootStore extends Instance<typeof RootStore> {}

/**
 * The data of a RootStore.
 */
export interface IRootStoreSnapshot extends SnapshotOut<typeof RootStore> {}
