import { StoreStore } from './Store.store';

it('StoreStore should be created', () => {
  const instance = StoreStore.create({});

  expect(instance).toBeTruthy();
});
