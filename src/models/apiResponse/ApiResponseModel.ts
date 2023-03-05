import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from '../withSetPropAction';

const ApiResponseProps = {
  code: types.maybeNull(types.number), // undefined
  type: types.maybeNull(types.string), // undefined
  message: types.maybeNull(types.string), // undefined
};

/**
 * Model description here for TypeScript hints.
 */
export const ApiResponseModel = types
  .model('ApiResponse', ApiResponseProps)
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IApiResponseModel extends Instance<typeof ApiResponseModel> {} // prettier-ignore
export interface IApiResponseModelSnapshotOut extends SnapshotOut<typeof ApiResponseModel> {} // prettier-ignore
export interface IApiResponseModelSnapshotIn extends SnapshotIn<typeof ApiResponseModel> {} // prettier-ignore
export type TApiResponseModelKeys = keyof IApiResponseModelSnapshotIn & string; // prettier-ignore
