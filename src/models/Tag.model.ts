import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from './withSetPropAction';

/**
 * Model description here for TypeScript hints.
 */
export const TagModel = types
  .model('Tag')
  .props({
    id: types.maybeNull(types.identifier), // undefined | int64 | undefined | undefined | undefined | undefined | undefined | undefined
    name: types.maybeNull(types.string), // undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined
  })
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ITagModel extends Instance<typeof TagModel> {} // prettier-ignore
export interface ITagModelSnapshotOut extends SnapshotOut<typeof TagModel> {} // prettier-ignore
export interface ITagModelSnapshotIn extends SnapshotIn<typeof TagModel> {} // prettier-ignore
export type TTagModelKeys = keyof ITagModelSnapshotIn & string; // prettier-ignore
