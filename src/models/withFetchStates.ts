import { observable } from 'mobx';
import { IStateTreeNode } from 'mobx-state-tree';
import { TApiErrorResponse } from '../services/api/ApiTypes';
import { getRootStore } from './getRootStore';

/**
 * The fetch states.
 */
export enum FetchStates {
  NONE = 'none',
  PENDING = 'pending',
  DONE = 'done',
  ERROR = 'error',
}

/**
 * Mixin to add fetch states to a model.
 *
 * @param instance
 * @returns
 */
export const withFetchStates = <T extends IStateTreeNode>(instance: T) => {
  const { loadingStore } = getRootStore(instance);
  const state = observable.box(FetchStates.NONE);
  const error = observable.box<TApiErrorResponse | null>(null);
  return {
    views: {
      /**
       * Returns true if the current fetch state is NONE.
       */
      get isPending() {
        return state.get() === FetchStates.PENDING;
      },

      /**
       * Returns true if the current fetch state is DONE.
       */
      get isDone() {
        return state.get() === FetchStates.DONE;
      },

      /**
       * Returns true if the current fetch state is ERROR.
       */
      get isError() {
        return state.get() === FetchStates.ERROR;
      },

      /**
       * Returns the current fetch state.
       */
      get fetchState() {
        return state;
      },

      /**
       * Returns the current fetch state.
       */
      get error() {
        return error;
      },
    },

    actions: {
      /**
       * Sets the fetch state to PENDING.
       */
      pending() {
        error.set(null);
        state.set(FetchStates.PENDING);
        requestAnimationFrame(() => loadingStore.setLoading(true));
      },

      /**
       * Sets the fetch state to DONE.
       */
      done() {
        error.set(null);
        state.set(FetchStates.DONE);
        setTimeout(() => loadingStore.setLoading(false), 600);
      },

      /**
       * Sets the fetch state to ERROR.
       *
       * @param err The error response from the API.
       */
      error(err: TApiErrorResponse) {
        error.set(err);
        state.set(FetchStates.ERROR);
        setTimeout(() => loadingStore.setLoading(false), 600);
      },

      /**
       * Sets the fetch state to NONE.
       *
       * @param newState
       */
      setFetchState(newState: FetchStates) {
        state.set(newState);
        if (newState === FetchStates.PENDING) {
          requestAnimationFrame(() => loadingStore.setLoading(true));
        } else {
          setTimeout(() => loadingStore.setLoading(false), 600);
        }
      },

      /**
       * Sets the error.
       * @param fetchError
       */
      setError(fetchError: TApiErrorResponse) {
        error.set(fetchError);
        setTimeout(() => loadingStore.setLoading(false), 600);
      },

      /**
       * Sets the fetch state to NONE.
       */
      clearFetchState() {
        state.set(FetchStates.NONE);
      },

      /**
       * Sets the error to null.
       */
      clearError() {
        error.set(null);
      },
    },
  };
};
