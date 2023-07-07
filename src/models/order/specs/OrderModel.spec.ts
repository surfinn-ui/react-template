import { describe, expect, it } from 'vitest';
import { IOrderModel, OrderModel } from '../OrderModel';

describe('OrderModel', () => {
  it('can be created', () => {
    const instance = OrderModel.create({} as IOrderModel);
    expect(instance).toBeTruthy();
  });
});
