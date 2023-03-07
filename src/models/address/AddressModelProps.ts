import { types } from "mobx-state-tree"

/**
 * Generated AddressModelProps 
 * 
 */
export const AddressModelProps = {
/**
 * @example 437 Lytton
 * @nullable
 */
    street: types.maybeNull(types.string), 
/**
 * @example Palo Alto
 * @nullable
 */
    city: types.maybeNull(types.string), 
/**
 * @example CA
 * @nullable
 */
    state: types.maybeNull(types.string), 
/**
 * @example 94301
 * @nullable
 */
    zip: types.maybeNull(types.string), 
};

