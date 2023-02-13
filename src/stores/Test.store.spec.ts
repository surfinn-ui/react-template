import { TestStore } from "./Test.store"

it("TestStore should be created", () => {
  const instance = TestStore.create({})

  expect(instance).toBeTruthy()
})
