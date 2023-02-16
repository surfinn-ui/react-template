import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from './withSetPropAction';
import { TagModel } from './Tag.model';

/**
 * Model description here for TypeScript hints.
 */
export const PetModel = types
  .model('Pet')
  .props({
    id: types.maybeNull(types.identifierNumber), // undefined | int64 | 10 | undefined | undefined | undefined | undefined | undefined
    name: types.maybeNull(types.string), // undefined | undefined | doggie | undefined | undefined | undefined | undefined | undefined
    category: types.maybeNull(types.string), // undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined
    photoUrls: types.maybeNull(types.array(types.string)), // undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined
    tags: types.maybeNull(types.array(TagModel)), // undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined
    status: types.maybeNull(types.string), // undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined
  })
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IPetModel extends Instance<typeof PetModel> {} // prettier-ignore
export interface IPetModelSnapshotOut extends SnapshotOut<typeof PetModel> {} // prettier-ignore
export interface IPetModelSnapshotIn extends SnapshotIn<typeof PetModel> {} // prettier-ignore
export type TPetModelKeys = keyof IPetModelSnapshotIn & string; // prettier-ignore
