import { types } from 'mobx-state-tree';
import { CategoryModel } from '../category/CategoryModel';
import { TagModel } from '../tag/TagModel';

/**
 * Generated PetModelProps
 *
 */
export const PetModelProps = {
/**
 * @description  Unique identifier for the pet
 * @format int64
 * @example 10
 * @required 
 */
    id: types.identifierNumber, 
/**
 * @description  Name of the pet
 * @example doggie
 * @required 
 */
    name: types.string, 
/**
 * @description  Category of the pet
 * @nullable
 */
    category: types.maybeNull(CategoryModel), 
/**
 * @required 
 */
    photoUrls: types.array(types.string), 
/**
 * @nullable
 */
    tags: types.maybeNull(types.array(TagModel)), 
/**
 * @description  pet status in the store
 * @nullable
 */
    status: types.maybeNull(types.enumeration("Pet:status", ["available","pending","sold"])), 
};
