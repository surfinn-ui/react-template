import { UserModel } from './User.model';

test('can be created', () => {
  const instance = UserModel.create({});

  expect(instance).toBeTruthy();
});
