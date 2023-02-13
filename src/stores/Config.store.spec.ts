import { ConfigStore } from "./Config.store"

test("can be created", () => {
  const instance = ConfigStore.create({})

  expect(instance).toBeTruthy()
})
