import { describe, expect, it } from 'vitest';
import { api } from './Api';

describe('Api', () => {
  it('can be created', () => {
    expect(api).toBeTruthy();

    console.log('api', api);
  });
});
