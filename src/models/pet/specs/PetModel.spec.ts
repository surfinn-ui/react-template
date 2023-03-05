import { PetModel } from '../PetModel';

describe('PetModel', () => {
  it('can be created', () => {
    const instance = PetModel.create({});
    expect(instance).toBeTruthy();
  });
});
