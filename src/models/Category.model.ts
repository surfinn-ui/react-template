import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from './withSetPropAction';

/**
 * Model description here for TypeScript hints.
 */
export const CategoryModel = types
  .model('Category')
  .props({
    id: types.maybeNull(types.identifierNumber), // undefined | int64 | 1 | undefined | undefined | undefined | undefined | undefined
    name: types.maybeNull(types.string), // undefined | undefined | Dogs | undefined | undefined | undefined | undefined | undefined
  })
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICategoryModel extends Instance<typeof CategoryModel> {} // prettier-ignore
export interface ICategoryModelSnapshotOut extends SnapshotOut<typeof CategoryModel> {} // prettier-ignore
export interface ICategoryModelSnapshotIn extends SnapshotIn<typeof CategoryModel> {} // prettier-ignore
export type TCategoryModelKeys = keyof ICategoryModelSnapshotIn & string; // prettier-ignore
