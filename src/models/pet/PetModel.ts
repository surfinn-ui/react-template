import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from '../withSetPropAction';
import { PetModelProps } from './PetModelProps';

/**
 * PetModel
 *
 */
export const PetModel = types
  .model('Pet', {
    ...PetModelProps,
    // add your own properties
  })
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IPetModel extends Instance<typeof PetModel> {} // prettier-ignore
export interface IPetModelSnapshotOut extends SnapshotOut<typeof PetModel> {} // prettier-ignore
export interface IPetModelSnapshotIn extends SnapshotIn<typeof PetModel> {} // prettier-ignore
export type TPetModelKeys = keyof IPetModelSnapshotIn & string; // prettier-ignore
