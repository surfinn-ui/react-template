import { ApiBase } from './api.base';
import { IOrderModel } from '../../models/Order.model';

class StoreApi extends ApiBase {
  url = '/store';

  /**
   * ## Find purchase order by ID
   * For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
   * @param {number} orderId **(REQUIRED)** {int64} ID of order that needs to be fetched
   * @returns
   */
  async getOrderById(orderId: number) {
    return this.getOne<IOrderModel>(`${this.url}/order/${orderId}`);
  }

  /**
   * ## Delete purchase order by ID
   * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
   * @param {number} orderId **(REQUIRED)** {int64} ID of the order that needs to be deleted
   * @returns
   */
  async deleteOrder(orderId: number) {
    return this.delete<any>(`${this.url}/order/${orderId}`);
  }

  /**
   * ## Place an order for a pet
   * Place a new order in the store
   * @param {any} payload **(REQUIRED)**
   * @returns
   */
  async placeOrder(payload: any) {
    return this.post<IOrderModel>(`${this.url}/order`, payload);
  }

  /**
   * ## Returns pet inventories by status
   * Returns a map of status codes to quantities
   *
   * @returns
   */
  async getInventory() {
    return this.getOne<any>(`${this.url}/inventory`);
  }
}

export const storeApi = new StoreApi();
