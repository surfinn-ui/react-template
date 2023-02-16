import { OrderModel } from './Order.model';

test('can be created', () => {
  const instance = OrderModel.create({});

  expect(instance).toBeTruthy();
});
