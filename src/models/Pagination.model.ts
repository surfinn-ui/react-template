import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from './withSetPropAction';

/**
 * Model description here for TypeScript hints.
 */
export const PaginationModel = types
  .model('Pagination')
  .props({
    offset: 0,
    page: 1,
    size: 0,
    numberOfElements: 0,
    totalElements: 0,
    totalPages: 0,
    first: types.maybeNull(types.boolean),
    last: types.maybeNull(types.boolean),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(withSetPropAction)
  .actions((self) => ({})); // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IPaginationModel extends Instance<typeof PaginationModel> {} // prettier-ignore
export interface IPaginationModelSnapshotOut extends SnapshotOut<typeof PaginationModel> {} // prettier-ignore
export interface IPaginationModelSnapshotIn extends SnapshotIn<typeof PaginationModel> {} // prettier-ignore
export type TPaginationModelPropKeys = keyof IPaginationModelSnapshotIn & string; // prettier-ignore
