import { getRoot, IStateTreeNode } from 'mobx-state-tree';
import { IRootStore, RootStore } from './Root.store';

/**
 * Returns a RootStore object in strongly typed way
 * for stores to access other stores.
 */
export const getRootStore = (self: IStateTreeNode): IRootStore => {
  return getRoot<typeof RootStore>(self);
};
