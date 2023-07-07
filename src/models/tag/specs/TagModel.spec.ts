import { describe, expect, it } from 'vitest';
import { ITagModel, TagModel } from '../TagModel';

describe('TagModel', () => {
  it('can be created', () => {
    const instance = TagModel.create({} as ITagModel);
    expect(instance).toBeTruthy();
  });
});
