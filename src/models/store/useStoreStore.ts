import { IDisposer } from 'mobx-state-tree';
import { useEffect } from 'react';
import { setupStore } from '../setupStore';
import { IStoreStore, StoreStore } from './StoreStore';

let storeInstance: IStoreStore | undefined;
let disposer: IDisposer | undefined;
const unsubscribe = () => {
  if (disposer) {
    disposer();
    disposer = undefined;
  }
};

export const useStoreStore = () => {
  useEffect(() => {
    if (!storeInstance) {
      storeInstance = StoreStore.create({});
      disposer?.();
      setupStore(storeInstance, 'STORE', (_disposer) => {
        disposer = _disposer;
      });
    }
  }, []);
  return [storeInstance, unsubscribe] as const;
};
