import { PaginationModel } from "./Pagination"

test("can be created", () => {
  const instance = PaginationModel.create({})

  expect(instance).toBeTruthy()
})
