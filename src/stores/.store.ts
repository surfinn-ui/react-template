import {
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { Model, IModel } from '../models/.model';
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

/**
 * Store description here for TypeScript hints.
 */
export const Store = types
  .model('Store')
  .props({
    /**
     * List of Models
     */
    list: types.array(Model),

    /**
     * Current Model
     */
    current: types.maybeNull(types.reference(Model)),
  })
  // Formatted Data
  .views((self) => ({}))
  // Extends
  .extend(withFetchStates) // Fetch State
  .extend(withPagination) // Pagination Information
  // Actions
  .actions(withSetPropAction) // Set Property Action
  // Update Store State
  .actions((self) => ({
    /**
     * Set current item
     */
    select: (value: null | number | IModel) => {
      let id: null | number = null;
      if (typeof value === 'number') {
        id = value;
      } else if (value) {
        id = value.id;
      }
      if (self.list.findIndex((item) => item.id === id) >= 0) {
        self.setProp('current', id);
      } else {
        self.setProp('current', null);
      }
    },

    /**
     * Replace store items
     */
    replace: (data: IModel[]) => {
      self.list.replace(data);
    },

    /**
     * Add item to store
     */
    add: (item: IModel) => {
      self.list.push(item);
    },

    /**
     * Remove item from store
     */
    remove: (item: IModel) => {
      self.list.remove(item);
    },

    /**
     * Update or add item to store
     */
    save: (item: IModel) => {
      const index = self.list.findIndex((_item) => _item.id === item.id);
      if (index >= 0) {
        self.list[index] = item;
      } else {
        self.list.push(item);
      }
    },
  }))
  // API CALLS
  .actions((self) => ({
    /**
     * Fetch all s
     */
    fetchAll: flow(function* (params: Partial<IModel>) {
      self.setFetchState(FetchStates.PENDING);
      const result: TListResult<IModel> = yield Api.fetchAll(params);
      if (result.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
        self.replace(result.data);
        self.setPagination(result.pagination);
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(result.kind);
      }
    }),

    /**
     * Fetch  by id
     */
    fetchById: flow(function* (id: number) {
      self.setFetchState(FetchStates.PENDING);
      const result: TGetResult<IModel> = yield Api.fetchById(id);
      if (result.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
        self.save(result.data);
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(result.kind);
      }
    }),

    /**
     * Delete  by id
     */
    create: flow(function* (payload: Partial<IModel>) {
      self.setFetchState(FetchStates.PENDING);
      const result: TPostResult<IModel> = yield Api.create(payload);
      if (result.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(result.kind);
      }
    }),

    /**
     * Delete  by id
     */
    update: flow(function* (id: number, payload: Partial<IModel>) {
      self.setFetchState(FetchStates.PENDING);
      const result: TPutResult<IModel> = yield Api.update(id, payload);
      if (result.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(result.kind);
      }
    }),

    /**
     * Delete  by id
     */
    patch: flow(function* (id: number, payload: Partial<IModel>) {
      self.setFetchState(FetchStates.PENDING);
      const result: TPatchResult<IModel> = yield Api.modify(id, payload);
      if (result.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(result.kind);
      }
    }),

    /**
     * Delete  by id or ids
     */
    delete: flow(function* (id: number | number[]) {
      self.setFetchState(FetchStates.PENDING);
      const result: TDeleteResult = Array.isArray(id)
        ? yield Api.removeAll(id)
        : yield Api.remove(id);
      if (result.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(result.kind);
      }
    }),
  }));

export interface IStore extends Instance<typeof Store> {}
export interface ISnapshotOut extends SnapshotOut<typeof Store> {}
export interface IStoreSnapshotIn extends SnapshotIn<typeof Store> {}
export type TStorePropKeys = keyof IStoreSnapshotIn & string;
