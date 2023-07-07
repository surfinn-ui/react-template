import { describe, expect, it } from 'vitest';
import { IUserModel, UserModel } from '../UserModel';

describe('UserModel', () => {
  it('can be created', () => {
    const instance = UserModel.create({} as IUserModel);
    expect(instance).toBeTruthy();
  });
});
