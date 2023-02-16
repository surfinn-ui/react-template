import { CategoryModel } from './Category.model';

test('can be created', () => {
  const instance = CategoryModel.create({});

  expect(instance).toBeTruthy();
});
