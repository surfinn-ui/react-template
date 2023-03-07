import { UserModel } from "../UserModel"

describe("UserModel", () => {

  it("can be created", () => {
    const instance = UserModel.create({});
    expect(instance).toBeTruthy();
  });

});