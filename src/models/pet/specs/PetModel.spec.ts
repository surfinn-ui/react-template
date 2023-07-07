import { describe, expect, it } from 'vitest';
import { IPetModel, PetModel } from '../PetModel';

describe('PetModel', () => {
  it('can be created', () => {
    const instance = PetModel.create({} as IPetModel);
    expect(instance).toBeTruthy();
  });
});
