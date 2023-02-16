import { CustomerModel } from './Customer.model';

test('can be created', () => {
  const instance = CustomerModel.create({});

  expect(instance).toBeTruthy();
});
