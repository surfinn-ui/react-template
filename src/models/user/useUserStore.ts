import { IDisposer } from 'mobx-state-tree';
import { useEffect } from 'react';
import { setupStore } from '../setupStore';
import { IUserStore, UserStore } from './UserStore';

let storeInstance: IUserStore | undefined;
let disposer: IDisposer | undefined;
const unsubscribe = () => {
  if (disposer) {
    disposer();
    disposer = undefined;
  }
};

export const useUserStore = function () {
  useEffect(() => {
    if (!storeInstance) {
      storeInstance = UserStore.create({});
      disposer?.();
      setupStore(storeInstance, 'USER', (_disposer) => {
        disposer = _disposer;
      });
    }
  }, []);
  return [storeInstance, unsubscribe] as const;
};
