import * as storage from '@/utils/storage';
import makeInspectable from 'mobx-devtools-mst';
import {
  IDisposer,
  IStateTreeNode,
  applySnapshot,
  onSnapshot,
} from 'mobx-state-tree';

const __DEV__ = process.env.NODE_ENV === 'development';

export async function setupStore(
  store: IStateTreeNode,
  storageKey: string,
  callback: (disposer: IDisposer | undefined) => void,
) {
  try {
    const rehydrated = (await storage.load(storageKey + '_STORE')) || {};
    applySnapshot(store, rehydrated);
  } catch (error) {
    if (__DEV__) {
      console.error(error);
    }
  }

  const _disposer = onSnapshot(store, (snapshot) => {
    storage.save(storageKey + '_STORE', snapshot);
  });

  if (__DEV__) {
    console.tron?.trackMstNode?.(store);
    makeInspectable(store);
  }
  callback(_disposer);
}
