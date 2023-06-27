import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from '../withSetPropAction';
import { ApiResponseModelProps } from './ApiResponseModelProps';

/**
 * ApiResponseModel
 *
 */
export const ApiResponseModel = types
  .model('ApiResponse', {
    ...ApiResponseModelProps,
    // add your own properties
  })
  .actions(withSetPropAction);
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IApiResponseModel extends Instance<typeof ApiResponseModel> {} // prettier-ignore
export interface IApiResponseModelSnapshotOut extends SnapshotOut<typeof ApiResponseModel> {} // prettier-ignore
export interface IApiResponseModelSnapshotIn extends SnapshotIn<typeof ApiResponseModel> {} // prettier-ignore
export type TApiResponseModelKeys = keyof IApiResponseModelSnapshotIn & string; // prettier-ignore
