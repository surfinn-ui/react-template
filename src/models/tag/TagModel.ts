import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from '../withSetPropAction';
import { TagModelProps } from './TagModelProps';

/**
 * TagModel
 *
 */
export const TagModel = types
  .model('Tag', {
    ...TagModelProps,
    // add your own properties here
  })
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ITagModel extends Instance<typeof TagModel> {} // prettier-ignore
export interface ITagModelSnapshotOut extends SnapshotOut<typeof TagModel> {} // prettier-ignore
export interface ITagModelSnapshotIn extends SnapshotIn<typeof TagModel> {} // prettier-ignore
export type TTagModelKeys = keyof ITagModelSnapshotIn & string; // prettier-ignore
