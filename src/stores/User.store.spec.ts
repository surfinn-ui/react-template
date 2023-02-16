import { UserStore } from './User.store';

it('UserStore should be created', () => {
  const instance = UserStore.create({});

  expect(instance).toBeTruthy();
});
