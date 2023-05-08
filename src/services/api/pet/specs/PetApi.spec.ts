import { describe, expect, it } from 'vitest';
import { petApi } from '../PetApi';

describe('PetApi', () => {
  it('can be created', () => {
    expect(petApi).toBeTruthy();
  });
});
