import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * Store description here for TypeScript hints.
 */
export const TestStore = types
  .model("Test")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ITestStore extends Instance<typeof TestStore> {}
export interface ITestStoreSnapshotOut extends SnapshotOut<typeof TestStore> {}
export interface ITestStoreSnapshotIn extends SnapshotIn<typeof TestStore> {}
export type TTestStoreKeys = keyof ITestStoreSnapshotIn & string;
