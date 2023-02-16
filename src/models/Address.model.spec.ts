import { AddressModel } from './Address.model';

test('can be created', () => {
  const instance = AddressModel.create({});

  expect(instance).toBeTruthy();
});
