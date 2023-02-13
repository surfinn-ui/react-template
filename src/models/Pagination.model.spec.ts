import { PaginationModel } from "./Pagination.model"

test("can be created", () => {
  const instance = PaginationModel.create({})

  expect(instance).toBeTruthy()
})
