/**
 * This file is where we do "rehydration" of your RootStore from AsyncStorage.
 * This lets you persist your state between app launches.
 *
 * Navigation state persistence is handled in navigationUtilities.tsx.
 *
 * Note that Fast Refresh doesn't play well with this file, so if you edit this,
 * do a full refresh of your app instead.
 *
 * @refresh reset
 */
import { applySnapshot, IDisposer, onSnapshot } from 'mobx-state-tree';
import type { IRootStore } from '../Root.store';
import * as storage from '../../utils/storage';

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = 'root-v1';

/**
 * Setup the root state.
 */
let _disposer: IDisposer | null;
export async function setupRootStore(rootStore: IRootStore) {
  let restoredState: any;

  try {
    // load the last known state from AsyncStorage
    restoredState = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {};
    applySnapshot(rootStore, restoredState);
  } catch (e) {
    // if there's any problems loading, then inform the dev what happened
    if (__DEV__) {
      console.tron.error(e.message, null);
    }
  }

  // stop tracking state changes if we've already setup
  if (_disposer) _disposer();

  // track changes & save to AsyncStorage
  _disposer = onSnapshot(rootStore, (snapshot) =>
    storage.save(ROOT_STATE_STORAGE_KEY, snapshot),
  );

  const unsubscribe = () => {
    _disposer();
    _disposer = null;
  };

  return { rootStore, restoredState, unsubscribe };
}
