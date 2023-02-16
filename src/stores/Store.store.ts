import { flow, Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from '../models/withSetPropAction';
import { TDeleteResult, TGetResult, TListResult, TPatchResult, TPostResult, TPutResult } from '../services/api';
import { storeApi } from '../services/api/Store.api';
import { FetchStates, withFetchStates } from './withFetchStates';
import { withPagination } from './withPagination';
// ^ generated dependencies by openapi-generator
// $ generated dependencies by openapi-generator

/**
 * Store description here for TypeScript hints.
 */
export const StoreStore = types
  .model("StoreStore")
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

    return ({
      // ^ generated actions by openapi-generator

      

    /**
     * Find purchase order by ID
     * 
     * For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
     * 
     * @tags *store*
     * @method **GET**
     * @endpoint `/store/order/{orderId}`

     * @param orderId ID of order that needs to be fetched
     *        It's a number, **REQUIRED** and in path.

     */
    getOrderById: flow(function* (orderId: number 
        ,   
    ) {
      self.setFetchState(FetchStates.PENDING);
      const response = yield storeApi.getOrderById(orderId 
        ,  );
      if (response.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
        return response.data as undefined;
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(response.kind);
      }
    }),


    /**
     * Delete purchase order by ID
     * 
     * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
     * 
     * @tags *store*
     * @method **DELETE**
     * @endpoint `/store/order/{orderId}`

     * @param orderId ID of the order that needs to be deleted
     *        It's a number, **REQUIRED** and in path.

     */
    deleteOrder: flow(function* (orderId: number 
        ,   
    ) {
      self.setFetchState(FetchStates.PENDING);
      const response = yield storeApi.deleteOrder(orderId 
        ,  );
      if (response.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
        return response.data as undefined;
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(response.kind);
      }
    }),
    

      

    /**
     * Place an order for a pet
     * 
     * Place a new order in the store
     * 
     * @tags *store*
     * @method **POST**
     * @endpoint `/store/order`


     @payload application/json,application/xml,application/x-www-form-urlencoded
              undefined
              optional
              [object Object]
     */
    placeOrder: flow(function* ( 
        , payload: string  
    ) {
      self.setFetchState(FetchStates.PENDING);
      const response = yield storeApi.placeOrder( 
        , payload );
      if (response.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
        return response.data as undefined;
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(response.kind);
      }
    }),
    

      

    /**
     * Returns pet inventories by status
     * 
     * Returns a map of status codes to quantities
     * 
     * @tags *store*
     * @method **GET**
     * @endpoint `/store/inventory`



     */
    getInventory: flow(function* ( 
        ,   
    ) {
      self.setFetchState(FetchStates.PENDING);
      const response = yield storeApi.getInventory( 
        ,  );
      if (response.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
        return response.data as undefined;
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(response.kind);
      }
    }),
    
      // $ generated actions by openapi-generator
    })
  })
  // CUSTOM ACTIONS
  .actions((self) => ({
  }));

export interface IStoreStore extends Instance<typeof StoreStore> {}
export interface IStoreSnapshotOut extends SnapshotOut<typeof StoreStore> {}
export interface IStoreStoreSnapshotIn extends SnapshotIn<typeof StoreStore> {}
export type TStoreStorePropKeys = keyof IStoreStoreSnapshotIn & string;
