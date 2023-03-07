import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../withSetPropAction"
import { AddressModelProps } from "./AddressModelProps"

/**
 * AddressModel 
 * 
 */
export const AddressModel = types
  .model("Address", {
    ...AddressModelProps,
    // add your own properties here
  })
  .actions(withSetPropAction)
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAddressModel extends Instance<typeof AddressModel> {} // prettier-ignore
export interface IAddressModelSnapshotOut extends SnapshotOut<typeof AddressModel> {} // prettier-ignore
export interface IAddressModelSnapshotIn extends SnapshotIn<typeof AddressModel> {} // prettier-ignore
export type TAddressModelKeys = keyof IAddressModelSnapshotIn & string; // prettier-ignore
