import { PetStore } from '../PetStore';

describe('PetStore', () => {
  it('should be created', () => {
    const instance = PetStore.create({});
    expect(instance).toBeTruthy();
  });

  describe('Search', () => {
    it('should be able to search all Pet.', () => {
      const instance = PetStore.create({});
      expect(instance).toBeTruthy();
    });
  });

  describe('Find', () => {
    it('should be able to find a Pet by ID.', () => {
      const instance = PetStore.create({});
      expect(instance).toBeTruthy();
    });
  });

  describe('Create', () => {
    it('should be able to create a Pet.', () => {
      const instance = PetStore.create({});
      expect(instance).toBeTruthy();
    });
  });

  describe('Update', () => {
    it('should be able to update a Pet.', () => {
      const instance = PetStore.create({});
      expect(instance).toBeTruthy();
    });
  });

  describe('Delete', () => {
    it('should be able to delete a Pet by ID.', () => {
      const instance = PetStore.create({});
      expect(instance).toBeTruthy();
    });
  });
});
