import { TagModel } from './Tag.model';

test('can be created', () => {
  const instance = TagModel.create({});

  expect(instance).toBeTruthy();
});
