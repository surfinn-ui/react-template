import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const CharacterModel = types
  .model("Character")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICharacterModel extends Instance<typeof CharacterModel> {}
export interface ICharacterModelSnapshotOut extends SnapshotOut<typeof CharacterModel> {}
export interface ICharacterModelSnapshotIn extends SnapshotIn<typeof CharacterModel> {}
export type TCharacterModelKeys = keyof ICharacterModelSnapshotIn & string;
