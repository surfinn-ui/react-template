import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from './withSetPropAction';

/**
 * Model description here for TypeScript hints.
 */
export const ApiResponseModel = types
  .model('ApiResponse')
  .props({
    code: types.maybeNull(types.number), // undefined | int32 | undefined | undefined | undefined | undefined | undefined | undefined
    type: types.maybeNull(types.string), // undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined
    message: types.maybeNull(types.string), // undefined | undefined | undefined | undefined | undefined | undefined | undefined | undefined
  })
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IApiResponseModel extends Instance<typeof ApiResponseModel> {} // prettier-ignore
export interface IApiResponseModelSnapshotOut extends SnapshotOut<typeof ApiResponseModel> {} // prettier-ignore
export interface IApiResponseModelSnapshotIn extends SnapshotIn<typeof ApiResponseModel> {} // prettier-ignore
export type TApiResponseModelKeys = keyof IApiResponseModelSnapshotIn & string; // prettier-ignore
