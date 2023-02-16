import { ApiResponseModel } from './ApiResponse.model';

test('can be created', () => {
  const instance = ApiResponseModel.create({});

  expect(instance).toBeTruthy();
});
