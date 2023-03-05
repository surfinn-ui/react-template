import {
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { withSetPropAction } from '../models/withSetPropAction';
import {
  TDeleteResult,
  TGetResult,
  TListResult,
  TPatchResult,
  TPostResult,
  TPutResult,
} from '../services/api';
import { Api } from '../services/api/.api';
import { FetchStates, withFetchStates } from './withFetchStates';
import { withPagination } from './withPagination';
// ^ generated dependencies by openapi-generator
// $ generated dependencies by openapi-generator

/**
 * Store description here for TypeScript hints.
 */
export const Store = types
  .model('Store')
  .props({
    // ^ generated props by openapi-generator
    // $ generated props by openapi-generator
  })
  // Formatted Data
  .views((self) => ({}))
  .extend(withFetchStates) // Fetch State
  .extend(withPagination) // Pagination Information
  .actions(withSetPropAction) // Set Property Action
  // Update Store State
  .actions((self) => ({
    // ^ generated update state actions by openapi-generator
    // $ generated update state actions by openapi-generator
  }))
  // OPEN API GENERATOR ACTIONS
  .actions((self) => {
    // updaters

    return {
      // ^ generated actions by openapi-generator
      // $ generated actions by openapi-generator
    };
  })
  // CUSTOM ACTIONS
  .actions((self) => ({}));

export interface IStore extends Instance<typeof Store> {}
export interface ISnapshotOut extends SnapshotOut<typeof Store> {}
export interface IStoreSnapshotIn extends SnapshotIn<typeof Store> {}
export type TStorePropKeys = keyof IStoreSnapshotIn & string;
