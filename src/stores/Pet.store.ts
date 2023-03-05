import {
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { withSetPropAction } from '../models/withSetPropAction';
import {
  TDeleteResult,
  TGetResult,
  TListResult,
  TPatchResult,
  TPostResult,
  TPutResult,
} from '../services/api';
import { petApi } from '../services/api/Pet.api';
import { FetchStates, withFetchStates } from './withFetchStates';
import { withPagination } from './withPagination';
// ^ generated dependencies by openapi-generator
// $ generated dependencies by openapi-generator

/**
 * Store description here for TypeScript hints.
 */
export const PetStore = types
  .model('PetStore')
  .props({
    // ^ generated props by openapi-generator
    // $ generated props by openapi-generator
  })
  // Formatted Data
  .views((self) => ({}))
  .extend(withFetchStates) // Fetch State
  .extend(withPagination) // Pagination Information
  .actions(withSetPropAction) // Set Property Action
  // Update Store State
  .actions((self) => ({
    // ^ generated update state actions by openapi-generator
    // $ generated update state actions by openapi-generator
  }))
  // OPEN API GENERATOR ACTIONS
  .actions((self) => {
    // updaters

    return {
      // ^ generated actions by openapi-generator

      /**
       * ## uploads an image
       *
       * @tags `pet`
       * @param {number} petId **REQUIRED** (int64) ID of pet to update
       * @param {string} additionalMetadata   Additional Metadata
       * @param {any} payload  {any}
       */
      uploadFile: flow(function* (
        petId: number,
        additionalMetadata: string,
        payload: any,
      ) {
        if (self.isPending) return;
        self.pending();
        const response = yield petApi.uploadFile(
          petId,
          additionalMetadata,
          payload,
        );
        if (response.kind === 'ok') {
          self.done();
          return response.data.data as any;
        } else {
          self.error(response);
          console.error(response.kind);
        }
      }),

      /**
       * ## Find pet by ID
       * Returns a single pet
       * @tags `pet`
       * @param {number} petId **REQUIRED** (int64) ID of pet to return
       */
      getPetById: flow(function* (petId: number) {
        if (self.isPending) return;
        self.pending();
        const response = yield petApi.getPetById(petId);
        if (response.kind === 'ok') {
          self.done();
          return response.data.data as any;
        } else {
          self.error(response);
          console.error(response.kind);
        }
      }),

      /**
       * ## Updates a pet in the store with form data
       *
       * @tags `pet`
       * @param {number} petId **REQUIRED** (int64) ID of pet that needs to be updated
       * @param {string} name   Name of pet that needs to be updated
       * @param {string} status   Status of pet that needs to be updated
       */
      updatePetWithForm: flow(function* (
        petId: number,
        name: string,
        status: string,
      ) {
        if (self.isPending) return;
        self.pending();
        const response = yield petApi.updatePetWithForm(petId, name, status);
        if (response.kind === 'ok') {
          self.done();
          return response.data.data as any;
        } else {
          self.error(response);
          console.error(response.kind);
        }
      }),

      /**
       * ## Deletes a pet
       * delete a pet
       * @tags `pet`
       * @param {number} petId **REQUIRED** (int64) Pet id to delete
       */
      deletePet: flow(function* (petId: number) {
        if (self.isPending) return;
        self.pending();
        const response = yield petApi.deletePet(petId);
        if (response.kind === 'ok') {
          self.done();
          return response.data.data as any;
        } else {
          self.error(response);
          console.error(response.kind);
        }
      }),

      /**
       * ## Finds Pets by tags
       * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
       * @tags `pet`
       * @param {string[]} tags   Tags to filter by
       */
      findPetsByTags: flow(function* (tags: string[]) {
        if (self.isPending) return;
        self.pending();
        const response = yield petApi.findPetsByTags(tags);
        if (response.kind === 'ok') {
          self.done();
          return response.data.data as any;
        } else {
          self.error(response);
          console.error(response.kind);
        }
      }),

      /**
       * ## Finds Pets by status
       * Multiple status values can be provided with comma separated strings
       * @tags `pet`
       * @param {string} status   Status values that need to be considered for filter
       */
      findPetsByStatus: flow(function* (status: string) {
        if (self.isPending) return;
        self.pending();
        const response = yield petApi.findPetsByStatus(status);
        if (response.kind === 'ok') {
          self.done();
          return response.data.data as any;
        } else {
          self.error(response);
          console.error(response.kind);
        }
      }),

      /**
       * ## Update an existing pet
       * Update an existing pet by Id
       * @tags `pet`
       * @param {any} payload **REQUIRED** {any} Update an existent pet in the store
       */
      updatePet: flow(function* (payload: any) {
        if (self.isPending) return;
        self.pending();
        const response = yield petApi.updatePet(payload);
        if (response.kind === 'ok') {
          self.done();
          return response.data.data as any;
        } else {
          self.error(response);
          console.error(response.kind);
        }
      }),

      /**
       * ## Add a new pet to the store
       * Add a new pet to the store
       * @tags `pet`
       * @param {any} payload **REQUIRED** {any} Create a new pet in the store
       */
      addPet: flow(function* (payload: any) {
        if (self.isPending) return;
        self.pending();
        const response = yield petApi.addPet(payload);
        if (response.kind === 'ok') {
          self.done();
          return response.data.data as any;
        } else {
          self.error(response);
          console.error(response.kind);
        }
      }),

      // $ generated actions by openapi-generator
    };
  })
  // CUSTOM ACTIONS
  .actions((self) => ({}));

export interface IPetStore extends Instance<typeof PetStore> {}
export interface IPetSnapshotOut extends SnapshotOut<typeof PetStore> {}
export interface IPetStoreSnapshotIn extends SnapshotIn<typeof PetStore> {}
export type TPetStorePropKeys = keyof IPetStoreSnapshotIn & string;
