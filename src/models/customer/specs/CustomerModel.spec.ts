import { describe, expect, it } from 'vitest';
import { CustomerModel } from '../CustomerModel';

describe('CustomerModel', () => {
  it('can be created', () => {
    const instance = CustomerModel.create({});
    expect(instance).toBeTruthy();
  });
});
