import { types } from 'mobx-state-tree';
import { AddressModel } from '../address/AddressModel';

/**
 * Generated CustomerModelProps
 *
 */
export const CustomerModelProps = {
/**
 * @format int64
 * @example 100000
 * @required 
 */
    id: types.identifierNumber, 
/**
 * @example fehguy
 * @nullable
 */
    username: types.maybeNull(types.string), 
/**
 * @nullable
 */
    address: types.maybeNull(types.array(AddressModel)), 
};
