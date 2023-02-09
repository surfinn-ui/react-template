import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const PaginationModel = types
  .model("Pagination")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Pagination extends Instance<typeof PaginationModel> {}
export interface PaginationSnapshotOut extends SnapshotOut<typeof PaginationModel> {}
export interface PaginationSnapshotIn extends SnapshotIn<typeof PaginationModel> {}
export const createPaginationDefaultModel = () => types.optional(PaginationModel, {})
