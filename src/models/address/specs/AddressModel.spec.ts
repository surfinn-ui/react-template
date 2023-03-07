import { AddressModel } from "../AddressModel"

describe("AddressModel", () => {

  it("can be created", () => {
    const instance = AddressModel.create({});
    expect(instance).toBeTruthy();
  });

});