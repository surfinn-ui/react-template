import { describe, expect, it } from 'vitest';
import { ApiResponseModel } from '../ApiResponseModel';

describe('ApiResponseModel', () => {
  it('can be created', () => {
    const instance = ApiResponseModel.create({});
    expect(instance).toBeTruthy();
  });
});
