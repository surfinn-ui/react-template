import { describe, expect, it } from 'vitest';
import { userApi } from '../UserApi';

describe('UserApi', () => {
  it('can be created', () => {
    expect(userApi).toBeTruthy();
  });
});
