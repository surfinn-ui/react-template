import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const TestModel = types
  .model("Test")
  .props({
    id: types.maybeNull(types.identifierNumber),
  })
  .actions(withSetPropAction)
//  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
//  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ITestModel extends Instance<typeof TestModel> {} // prettier-ignore
export interface ITestModelSnapshotOut extends SnapshotOut<typeof TestModel> {} // prettier-ignore
export interface ITestModelSnapshotIn extends SnapshotIn<typeof TestModel> {} // prettier-ignore
export type TTestModelKeys = keyof ITestModelSnapshotIn & string; // prettier-ignore
