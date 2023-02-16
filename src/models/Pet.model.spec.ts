import { PetModel } from './Pet.model';

test('can be created', () => {
  const instance = PetModel.create({});

  expect(instance).toBeTruthy();
});
