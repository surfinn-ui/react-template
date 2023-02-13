import { flow, Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { TestModel, ITestModel } from '../models/Test.model';
import { withSetPropAction } from '../models/withSetPropAction';
import { TDeleteResult, TGetResult, TListResult, TPatchResult, TPostResult, TPutResult } from '../services/api';
import { testApi } from '../services/api/Test.api';
import { FetchStates, withFetchStates } from './withFetchStates';
import { withPagination } from './withPagination';

/**
 * Store description here for TypeScript hints.
 */
export const TestStore = types
  .model("TestStore")
  .props({
    /**
     * List of TestModels
     */
    list: types.array(TestModel),

    /**
     * Current TestModel
     */
    current: types.maybeNull(types.reference(TestModel)),
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
    select: (value: null | number | ITestModel) => {
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
    replace: (data: ITestModel[]) => {
      self.list.replace(data);
    },
    
    /**
     * Add item to store
     */
    add: (item: ITestModel) => {
      self.list.push(item);
    },

    /**
     * Remove item from store
     */    
    remove: (item: ITestModel) => {
      self.list.remove(item);
    },
    
    /**
     * Update or add item to store
     */
    save: (item: ITestModel) => {
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
     * Fetch all tests
     */
    fetchAll: flow(function* (params: Partial<ITestModel>) {
      self.setFetchState(FetchStates.PENDING);
      const result: TListResult<ITestModel> = yield testApi.fetchAll(params);
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
     * Fetch test by id
     */
    fetchById: flow(function* (id:number) {
      self.setFetchState(FetchStates.PENDING);
      const result: TGetResult<ITestModel> = yield testApi.fetchById(id);
      if (result.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
        self.save(result.data);
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(result.kind);
      }
    }),
    
    /**
     * Delete test by id
     */
    create: flow(function* (payload: Partial<ITestModel>) {
      self.setFetchState(FetchStates.PENDING);
      const result: TPostResult<ITestModel> = yield testApi.create(payload);
      if (result.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(result.kind);
      }
    }),

    /**
     * Delete test by id
     */
    update: flow(function* (id: number, payload: Partial<ITestModel>) {
      self.setFetchState(FetchStates.PENDING);
      const result: TPutResult<ITestModel> = yield testApi.update(id, payload);
      if (result.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(result.kind);
      }
    }),
    
    /**
     * Delete test by id
     */
    patch: flow(function* (id: number, payload: Partial<ITestModel>) {
      self.setFetchState(FetchStates.PENDING);
      const result: TPatchResult<ITestModel> = yield testApi.modify(id, payload);
      if (result.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(result.kind);
      }
    }),

    /**
     * Delete test by id or ids
     */
    delete: flow(function* (id: number | number[]) {
      self.setFetchState(FetchStates.PENDING);
      const result: TDeleteResult = Array.isArray(id) 
        ? yield testApi.removeAll(id)
        : yield testApi.remove(id);
      if (result.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(result.kind);
      }
    }),
  }));

export interface ITestStore extends Instance<typeof TestStore> {}
export interface ITestSnapshotOut extends SnapshotOut<typeof TestStore> {}
export interface ITestStoreSnapshotIn extends SnapshotIn<typeof TestStore> {}
export type TTestStorePropKeys = keyof ITestStoreSnapshotIn & string;
