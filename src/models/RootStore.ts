import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { StoreStore } from './store/StoreStore';
import { Store } from './/Store';
import { ApiResponseStore } from './apiResponse/ApiResponseStore';
import { PetStore } from './pet/PetStore';
import { TagStore } from './tag/TagStore';
import { UserStore } from './user/UserStore';
import { CategoryStore } from './category/CategoryStore';
import { AddressStore } from './address/AddressStore';
import { CustomerStore } from './customer/CustomerStore';
import { OrderStore } from './order/OrderStore';

/**
 * A RootStore model.
 */
export const RootStore = types
  .model('RootStore')
  .props({
    // STORES
  })
  .actions((self) => ({}));

/**
 * The RootStore instance.
 */
export interface IRootStore extends Instance<typeof RootStore> {}

/**
 * The data of a RootStore.
 */
export interface IRootStoreSnapshot extends SnapshotOut<typeof RootStore> {}
