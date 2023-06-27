import { describe, expect, it } from 'vitest';
import { UserStore } from '../UserStore';

describe('UserStore', () => {
  it('should be created', () => {
    const instance = UserStore.create({});
    expect(instance).toBeTruthy();
  });

  describe('Search', () => {
    it('should be able to search all User.', () => {
      const instance = UserStore.create({});
      expect(instance).toBeTruthy();
    });
  });

  describe('Find', () => {
    it('should be able to find a User by ID.', () => {
      const instance = UserStore.create({});
      expect(instance).toBeTruthy();
    });
  });

  describe('Create', () => {
    it('should be able to create a User.', () => {
      const instance = UserStore.create({});
      expect(instance).toBeTruthy();
    });
  });

  describe('Update', () => {
    it('should be able to update a User.', () => {
      const instance = UserStore.create({});
      expect(instance).toBeTruthy();
    });
  });

  describe('Delete', () => {
    it('should be able to delete a User by ID.', () => {
      const instance = UserStore.create({});
      expect(instance).toBeTruthy();
    });
  });
});
