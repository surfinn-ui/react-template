import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from '../withSetPropAction';

const TagProps = {
  id: types.maybeNull(types.identifierNumber), // undefined
  name: types.maybeNull(types.string), // undefined
};

/**
 * Model description here for TypeScript hints.
 */
export const TagModel = types.model('Tag', TagProps).actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ITagModel extends Instance<typeof TagModel> {} // prettier-ignore
export interface ITagModelSnapshotOut extends SnapshotOut<typeof TagModel> {} // prettier-ignore
export interface ITagModelSnapshotIn extends SnapshotIn<typeof TagModel> {} // prettier-ignore
export type TTagModelKeys = keyof ITagModelSnapshotIn & string; // prettier-ignore
