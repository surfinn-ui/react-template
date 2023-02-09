import { CharacterModel } from "./Character.model"

test("can be created", () => {
  const instance = CharacterModel.create({})

  expect(instance).toBeTruthy()
})
