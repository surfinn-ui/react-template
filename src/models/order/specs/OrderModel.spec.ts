import { describe, expect, it } from 'vitest';
import { OrderModel } from '../OrderModel';

describe('OrderModel', () => {
  it('can be created', () => {
    const instance = OrderModel.create({});
    expect(instance).toBeTruthy();
  });
});
