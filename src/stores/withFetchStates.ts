import { observable } from 'mobx';
import { IStateTreeNode } from 'mobx-state-tree';

export enum FetchStates {
  PENDING = 'PENDING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}

export const withFetchStates = <T extends IStateTreeNode>(_store: T) => {
  const state = observable.box(FetchStates.PENDING);
  return {
    views: {
      get fetchState() {
        return state.get();
      },
    },

    actions: {
      setFetchState(newState: FetchStates) {
        state.set(newState);
      },
    },
  };
};
