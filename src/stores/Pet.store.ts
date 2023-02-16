import { flow, Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from '../models/withSetPropAction';
import { TDeleteResult, TGetResult, TListResult, TPatchResult, TPostResult, TPutResult } from '../services/api';
import { petApi } from '../services/api/Pet.api';
import { FetchStates, withFetchStates } from './withFetchStates';
import { withPagination } from './withPagination';
// ^ generated dependencies by openapi-generator
// $ generated dependencies by openapi-generator

/**
 * Store description here for TypeScript hints.
 */
export const PetStore = types
  .model("PetStore")
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

    return ({
      // ^ generated actions by openapi-generator

      

    /**
     * uploads an image
     * 
     * 
     * 
     * @tags *pet*
     * @method **POST**
     * @endpoint `/pet/{petId}/uploadImage`

     * @param petId ID of pet to update
     *        It's a number, **REQUIRED** and in path.
     * @param additionalMetadata Additional Metadata
     *        It's a string, optional and in query.
     @payload application/octet-stream
              undefined
              optional
              application/octet-stream
     */
    uploadFile: flow(function* (petId: number, additionalMetadata: string 
        , payload: string  
    ) {
      self.setFetchState(FetchStates.PENDING);
      const response = yield petApi.uploadFile(petId, additionalMetadata 
        , payload );
      if (response.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
        return response.data as undefined;
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(response.kind);
      }
    }),
    

      

    /**
     * Find pet by ID
     * 
     * Returns a single pet
     * 
     * @tags *pet*
     * @method **GET**
     * @endpoint `/pet/{petId}`

     * @param petId ID of pet to return
     *        It's a number, **REQUIRED** and in path.

     */
    getPetById: flow(function* (petId: number 
        ,   
    ) {
      self.setFetchState(FetchStates.PENDING);
      const response = yield petApi.getPetById(petId 
        ,  );
      if (response.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
        return response.data as undefined;
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(response.kind);
      }
    }),


    /**
     * Updates a pet in the store with form data
     * 
     * 
     * 
     * @tags *pet*
     * @method **POST**
     * @endpoint `/pet/{petId}`

     * @param petId ID of pet that needs to be updated
     *        It's a number, **REQUIRED** and in path.
     * @param name Name of pet that needs to be updated
     *        It's a string, optional and in query.
     * @param status Status of pet that needs to be updated
     *        It's a string, optional and in query.

     */
    updatePetWithForm: flow(function* (petId: number, name: string, status: string 
        ,   
    ) {
      self.setFetchState(FetchStates.PENDING);
      const response = yield petApi.updatePetWithForm(petId, name, status 
        ,  );
      if (response.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
        return response.data as undefined;
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(response.kind);
      }
    }),


    /**
     * Deletes a pet
     * 
     * delete a pet
     * 
     * @tags *pet*
     * @method **DELETE**
     * @endpoint `/pet/{petId}`
     * @header apiKey 
     *        It's a string, optional and in header.
     * @param apiKey 
     *        It's a string, optional and in header.
     * @param petId Pet id to delete
     *        It's a number, **REQUIRED** and in path.

     */
    deletePet: flow(function* (petId: number 
        ,   
    ) {
      self.setFetchState(FetchStates.PENDING);
      const response = yield petApi.deletePet(petId 
        ,  );
      if (response.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
        return response.data as undefined;
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(response.kind);
      }
    }),
    

      

    /**
     * Finds Pets by tags
     * 
     * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
     * 
     * @tags *pet*
     * @method **GET**
     * @endpoint `/pet/findByTags`

     * @param tags Tags to filter by
     *        It's a string[], optional and in query.

     */
    findPetsByTags: flow(function* (tags: string[] 
        ,   
    ) {
      self.setFetchState(FetchStates.PENDING);
      const response = yield petApi.findPetsByTags(tags 
        ,  );
      if (response.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
        return response.data as undefined;
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(response.kind);
      }
    }),
    

      

    /**
     * Finds Pets by status
     * 
     * Multiple status values can be provided with comma separated strings
     * 
     * @tags *pet*
     * @method **GET**
     * @endpoint `/pet/findByStatus`

     * @param status Status values that need to be considered for filter
     *        It's a string, optional and in query.

     */
    findPetsByStatus: flow(function* (status: string 
        ,   
    ) {
      self.setFetchState(FetchStates.PENDING);
      const response = yield petApi.findPetsByStatus(status 
        ,  );
      if (response.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
        return response.data as undefined;
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(response.kind);
      }
    }),
    

      

    /**
     * Update an existing pet
     * 
     * Update an existing pet by Id
     * 
     * @tags *pet*
     * @method **PUT**
     * @endpoint `/pet`


     @payload application/json,application/xml,application/x-www-form-urlencoded
              Update an existent pet in the store
              **REQUIRED**
              [object Object]
     */
    updatePet: flow(function* ( 
        , payload: string  
    ) {
      self.setFetchState(FetchStates.PENDING);
      const response = yield petApi.updatePet( 
        , payload );
      if (response.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
        return response.data as undefined;
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(response.kind);
      }
    }),


    /**
     * Add a new pet to the store
     * 
     * Add a new pet to the store
     * 
     * @tags *pet*
     * @method **POST**
     * @endpoint `/pet`


     @payload application/json,application/xml,application/x-www-form-urlencoded
              Create a new pet in the store
              **REQUIRED**
              [object Object]
     */
    addPet: flow(function* ( 
        , payload: string  
    ) {
      self.setFetchState(FetchStates.PENDING);
      const response = yield petApi.addPet( 
        , payload );
      if (response.kind === 'ok') {
        self.setFetchState(FetchStates.DONE);
        return response.data as undefined;
      } else {
        self.setFetchState(FetchStates.ERROR);
        console.error(response.kind);
      }
    }),
    
      // $ generated actions by openapi-generator
    })
  })
  // CUSTOM ACTIONS
  .actions((self) => ({
  }));

export interface IPetStore extends Instance<typeof PetStore> {}
export interface IPetSnapshotOut extends SnapshotOut<typeof PetStore> {}
export interface IPetStoreSnapshotIn extends SnapshotIn<typeof PetStore> {}
export type TPetStorePropKeys = keyof IPetStoreSnapshotIn & string;
