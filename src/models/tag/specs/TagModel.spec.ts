import { TagModel } from '../TagModel';

describe('TagModel', () => {
  it('can be created', () => {
    const instance = TagModel.create({});
    expect(instance).toBeTruthy();
  });
});
