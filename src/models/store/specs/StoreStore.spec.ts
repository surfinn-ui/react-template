import { StoreStore } from '../StoreStore';

describe('StoreStore', () => {
  it('should be created', () => {
    const instance = StoreStore.create({});
    expect(instance).toBeTruthy();
  });

  describe('Search', () => {
    it('should be able to search all Store.', () => {
      const instance = StoreStore.create({});
      expect(instance).toBeTruthy();
    });
  });

  describe('Find', () => {
    it('should be able to find a Store by ID.', () => {
      const instance = StoreStore.create({});
      expect(instance).toBeTruthy();
    });
  });

  describe('Create', () => {
    it('should be able to create a Store.', () => {
      const instance = StoreStore.create({});
      expect(instance).toBeTruthy();
    });
  });

  describe('Update', () => {
    it('should be able to update a Store.', () => {
      const instance = StoreStore.create({});
      expect(instance).toBeTruthy();
    });
  });

  describe('Delete', () => {
    it('should be able to delete a Store by ID.', () => {
      const instance = StoreStore.create({});
      expect(instance).toBeTruthy();
    });
  });
});
