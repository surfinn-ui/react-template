import {
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { withSetPropAction } from '../withSetPropAction';
import {
  TSearchResult,
  TFindResult,
  TCreateResult,
  TUpdateResult,
  TPartialUpdateResult,
  TDeleteResult,
} from '../../services/api';
import { storeApi } from '../../services/api/store/StoreApi';
import { FetchStates, withFetchStates } from '../withFetchStates';
import { withPagination } from '../withPagination';
// ^ generated dependencies by openapi-generator
// $ generated dependencies by openapi-generator

const StoreStoreProps = {
  // ^ generated props by openapi-generator
  // $ generated props by openapi-generator
};

/**
 * Store description here for TypeScript hints.
 */
export const StoreStore = types
  .model('StoreStore', StoreStoreProps)
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
    // ^ generated actions by openapi-generator

    /**
     * ## Find purchase order by ID
     * For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
     * @tags `store`
     * @param {number} orderId **REQUIRED** (int64) ID of order that needs to be fetched
     */
    const getOrderById = flow(function* (orderId: number) {
      if (self.isPending) return;
      self.pending();
      const response = yield storeApi.getOrderById(orderId);
      if (response.kind === 'ok') {
        self.done();
        return response.data.data as any;
      } else {
        self.error(response);
        console.error(response.kind);
      }
    });

    /**
     * ## Delete purchase order by ID
     * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
     * @tags `store`
     * @param {number} orderId **REQUIRED** (int64) ID of the order that needs to be deleted
     */
    const deleteOrder = flow(function* (orderId: number) {
      if (self.isPending) return;
      self.pending();
      const response = yield storeApi.deleteOrder(orderId);
      if (response.kind === 'ok') {
        self.done();
        return response.data.data as any;
      } else {
        self.error(response);
        console.error(response.kind);
      }
    });

    /**
     * ## Place an order for a pet
     * Place a new order in the store
     * @tags `store`
     * @param {any} payload  {any}
     */
    const placeOrder = flow(function* (payload: any) {
      if (self.isPending) return;
      self.pending();
      const response = yield storeApi.placeOrder(payload);
      if (response.kind === 'ok') {
        self.done();
        return response.data.data as any;
      } else {
        self.error(response);
        console.error(response.kind);
      }
    });

    /**
     * ## Returns pet inventories by status
     * Returns a map of status codes to quantities
     * @tags `store`
     *
     */
    const getInventory = flow(function* () {
      if (self.isPending) return;
      self.pending();
      const response = yield storeApi.getInventory();
      if (response.kind === 'ok') {
        self.done();
        return response.data.data as any;
      } else {
        self.error(response);
        console.error(response.kind);
      }
    });

    // $ generated actions by openapi-generator
    return {
      // ^ generated actions by openapi-generator
      // $ generated actions by openapi-generator
    };
  })
  // CUSTOM ACTIONS
  .actions((self) => ({}));

export interface IStoreStore extends Instance<typeof StoreStore> {}
export interface IStoreSnapshotOut extends SnapshotOut<typeof StoreStore> {}
export interface IStoreStoreSnapshotIn extends SnapshotIn<typeof StoreStore> {}
export type TStoreStorePropKeys = keyof IStoreStoreSnapshotIn & string;
