import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from '../withSetPropAction';
import { CategoryModelProps } from './CategoryModelProps';

/**
 * CategoryModel
 *
 */
export const CategoryModel = types
  .model('Category', {
    ...CategoryModelProps,
    // add your own properties
  })
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICategoryModel extends Instance<typeof CategoryModel> {} // prettier-ignore
export interface ICategoryModelSnapshotOut extends SnapshotOut<typeof CategoryModel> {} // prettier-ignore
export interface ICategoryModelSnapshotIn extends SnapshotIn<typeof CategoryModel> {} // prettier-ignore
export type TCategoryModelKeys = keyof ICategoryModelSnapshotIn & string; // prettier-ignore
