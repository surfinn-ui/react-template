import { types } from 'mobx-state-tree';

/**
 * Generated UserModelProps
 *
 */
export const UserModelProps = {
  /**
   * @format int64
   * @example 10
   * @required
   */
  id: types.identifierNumber,
  /**
   * @example theUser
   * @required
   */
  username: types.string,
  /**
   * @example John
   * @nullable
   */
  firstName: types.maybeNull(types.string),
  /**
   * @example James
   * @nullable
   */
  lastName: types.maybeNull(types.string),
  /**
   * @example john@email.com
   * @nullable
   */
  email: types.maybeNull(types.string),
  /**
   * @example 12345
   * @nullable
   */
  password: types.maybeNull(types.string),
  /**
   * @example 12345
   * @nullable
   */
  phone: types.maybeNull(types.string),
  /**
   * @description  User Status
   * @format int32
   * @example 1
   * @required
   */
  userStatus: types.number,
};
