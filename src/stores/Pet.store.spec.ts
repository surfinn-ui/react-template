import { PetStore } from './Pet.store';

it('PetStore should be created', () => {
  const instance = PetStore.create({});

  expect(instance).toBeTruthy();
});
