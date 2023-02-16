import { ApiBase } from './api.base';
import { IOrderModel } from '../../models/Order.model';

class StoreApi extends ApiBase {
  url = '/store';

  /**
   * Find purchase order by ID
   * For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
   * @param orderId  number  **REQUIRED** , in path. ID of order that needs to be fetched
   * @returns
   */
  async getOrderById(orderId: number) {
    return this.getOne<IOrderModel>(`/store/order/${orderId}`);
  }

  /**
   * Delete purchase order by ID
   * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
   * @param orderId  number  **REQUIRED** , in path. ID of the order that needs to be deleted
   * @returns
   */
  async deleteOrder(orderId: number) {
    return this.delete<any>(`/store/order/${orderId}`);
  }

  /**
   * Place an order for a pet
   * Place a new order in the store

    * @returns
    */
  async placeOrder() {
    return this.post<IOrderModel>(`/store/order`);
  }

  /**
   * Returns pet inventories by status
   * Returns a map of status codes to quantities

    * @returns
    */
  async getInventory() {
    return this.getOne<any>(`/store/inventory`);
  }
}

export const storeApi = new StoreApi();
