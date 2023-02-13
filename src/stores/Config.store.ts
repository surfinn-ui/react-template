import {
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { withSetPropAction } from '../models/withSetPropAction';
import { FetchStates, withFetchStates } from './withFetchStates';
import {
  TDeleteResult,
  TGetResult,
  TListResult,
  TPatchResult,
  TPostResult,
  TPutResult,
} from '../services/api';
import { IPaginationModel, PaginationModel } from '../models/Pagination.model';

/**
 * Store description here for TypeScript hints.
 */
export const ConfigStore = types
  .model('ConfigStore')
  .props({})
  .extend(withFetchStates)
  .actions(withSetPropAction)
//.views((self) => ({}))
//.actions((self) => ({}))

export interface IConfigStore extends Instance<typeof ConfigStore> {} // prettier-ignore
export interface IConfigSnapshotOut extends SnapshotOut<typeof ConfigStore> {} // prettier-ignore
export interface IConfigStoreSnapshotIn extends SnapshotIn<typeof ConfigStore> {} // prettier-ignore
export type TConfigStorePropKeys = keyof IConfigStoreSnapshotIn & string; // prettier-ignore
