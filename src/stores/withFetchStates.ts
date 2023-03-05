import { observable } from 'mobx';
import { IStateTreeNode } from 'mobx-state-tree';

export enum FetchStates {
  PENDING = 'pending',
  DONE = 'done',
  ERROR = 'error',
}

export interface IFetchError {
  resultCode: string | null;
  errorCode: string | null;
  title: string | null;
  errorMessage: string | null;
  details: string[] | null;
}

export const withFetchStates = <T extends IStateTreeNode>(_store: T) => {
  const state = observable.box(FetchStates.PENDING);
  const error = observable.box<IFetchError | null>(null);
  return {
    views: {
      get fetchState() {
        return state;
      },
      get isPending() {
        return state.get() === FetchStates.PENDING;
      },
      get isDone() {
        return state.get() === FetchStates.DONE;
      },
      get isError() {
        return state.get() === FetchStates.ERROR;
      },
      get error() {
        return error.get();
      },
    },

    actions: {
      pending() {
        state.set(FetchStates.PENDING);
        error.set(null);
      },
      done() {
        state.set(FetchStates.DONE);
        error.set(null);
      },
      error(fetchError: IFetchError) {
        state.set(FetchStates.ERROR);
        error.set(fetchError);
      },
      setFetchState(newState: FetchStates) {
        state.set(newState);
      },
      setFetchError(newError: IFetchError) {
        error.set(newError);
      },
    },
  };
};
