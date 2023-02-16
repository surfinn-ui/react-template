import { Store } from './.store';

it('Store should be created', () => {
  const instance = Store.create({});

  expect(instance).toBeTruthy();
});
