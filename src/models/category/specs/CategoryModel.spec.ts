import { describe, expect, it } from 'vitest';
import { CategoryModel } from '../CategoryModel';

describe('CategoryModel', () => {
  it('can be created', () => {
    const instance = CategoryModel.create({ id: 1, name: 'newCategory' });
    expect(instance).toBeTruthy();
  });
});
