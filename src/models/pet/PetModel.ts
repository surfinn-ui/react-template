import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from '../withSetPropAction';
import { TagModel } from './TagModel';

const PetProps = {
  id: types.maybeNull(types.identifierNumber), // undefined
  name: types.maybeNull(types.string), // undefined
  category: types.maybeNull(types.string), // undefined
  photoUrls: types.maybeNull(types.array(types.string)), // undefined
  tags: types.maybeNull(types.array(TagModel)), // undefined
  status: types.maybeNull(types.string), // undefined
};

/**
 * Model description here for TypeScript hints.
 */
export const PetModel = types.model('Pet', PetProps).actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IPetModel extends Instance<typeof PetModel> {} // prettier-ignore
export interface IPetModelSnapshotOut extends SnapshotOut<typeof PetModel> {} // prettier-ignore
export interface IPetModelSnapshotIn extends SnapshotIn<typeof PetModel> {} // prettier-ignore
export type TPetModelKeys = keyof IPetModelSnapshotIn & string; // prettier-ignore
