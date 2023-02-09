import { TestModel } from "./Test.model"

test("can be created", () => {
  const instance = TestModel.create({})

  expect(instance).toBeTruthy()
})
