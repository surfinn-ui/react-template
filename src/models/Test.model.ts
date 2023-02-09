import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const TestModel = types
  .model("Test")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ITestModel extends Instance<typeof TestModel> {}
export interface ITestModelSnapshotOut extends SnapshotOut<typeof TestModel> {}
export interface ITestModelSnapshotIn extends SnapshotIn<typeof TestModel> {}
export type TTestModelKeys = keyof ITestModelSnapshotIn & string;
