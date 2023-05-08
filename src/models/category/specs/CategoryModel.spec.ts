import { describe, expect, it } from 'vitest';
import { CategoryModel } from '../CategoryModel';

describe('CategoryModel', () => {
  it('can be created', () => {
    const instance = CategoryModel.create({});
    expect(instance).toBeTruthy();
  });
});
