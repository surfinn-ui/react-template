import { describe, expect, it } from 'vitest';
import { storeApi } from '../StoreApi';

describe('StoreApi', () => {
  it('can be created', () => {
    expect(storeApi).toBeTruthy();
  });
});
