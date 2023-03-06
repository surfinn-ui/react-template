import { types } from 'mobx-state-tree';

/**
 * Generated OrderModelProps
 *
 */
export const OrderModelProps = {
  /**
   * @format int64
   * @example 10
   * @required
   */
  id: types.identifierNumber,
  /**
   * @format int64
   * @example 198772
   * @required
   */
  petId: types.number,
  /**
   * @format int32
   * @example 7
   * @required
   */
  quantity: types.number,
  /**
   * @format date-time
   * @nullable
   */
  shipDate: types.maybeNull(types.string),
  /**
   * @description  Order Status
   * @example approved
   * @nullable
   */
  status: types.maybeNull(
    types.enumeration('Order:status', ['placed', 'approved', 'delivered']),
  ),
  /**
   * @nullable
   */
  complete: types.maybeNull(types.boolean),
};
