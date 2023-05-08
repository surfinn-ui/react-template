import { Instance, SnapshotOut, types } from 'mobx-state-tree';

/**
 * # LoadingStore
 *
 * LoadingStore을 설명하세요.
 */
export const LoadingStore = types
  .model('LoadingStore')
  // --------------------------------------------------------------------------
  .props({
    loading: types.optional(types.boolean, false),
    message: types.optional(types.string, ''),
    tableLoading: types.optional(types.boolean, false),
    tableMessage: types.optional(types.string, ''),
  })
  .views((self) => ({}))
  .actions((self) => ({
    setLoading: (loading: boolean) => {
      self.loading = loading;
    },
    setMessage: (message: string) => {
      self.message = message;
    },
  }))
  // --------------------------------------------------------------------------
  // MUTATEs - 모델 상태를 변경
  .actions((self) => ({
    allLoading: () => {
      // self.message = '';
      self.loading = true;
    },
    allLoadingNoMsg: () => {
      // self.message = '';
      self.loading = true;
    },
    closeLoadingNoMsg: () => {
      self.message = '';
      self.loading = false;
    },
    tableLoadingNoMsg: () => {
      // self.tableMessage = '';
      self.tableLoading = true;
    },
    tableCloseLoadingNoMsg: () => {
      self.tableMessage = '';
      self.tableLoading = false;
    },
  }));
// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
type TLoadingStore = Instance<typeof LoadingStore>;
type TLoadingStoreSnapshot = SnapshotOut<typeof LoadingStore>;

export interface ILoadingStore extends TLoadingStore {}
export type TLoadingStoreKeys = keyof TLoadingStoreSnapshot & string;
export interface ILoadingStoreSnapshot extends TLoadingStoreSnapshot {}
