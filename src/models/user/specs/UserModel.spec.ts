import { describe, expect, it } from 'vitest';
import { UserModel } from '../UserModel';

describe('UserModel', () => {
  it('can be created', () => {
    const instance = UserModel.create({});
    expect(instance).toBeTruthy();
  });
});
