import { ApiBase } from './api.base';
import { IApiResponseModel } from '../../models/ApiResponse.model';
import { IPetModel } from '../../models/Pet.model';

class PetApi extends ApiBase {
  url = '/pet';

  /**
   * uploads an image
   *
   * @param petId  *number* **(REQUIRED)** , in path. ID of pet to update
   * @param additionalMetadata  *string*, in query. Additional Metadata
   * @returns
   */
  async uploadFile(petId: number, additionalMetadata: string, payload: any) {
    return this.post<IApiResponseModel>(
      `/pet/${petId}/uploadImage?additionalMetadata=${additionalMetadata}`,
      payload,
      { headers: { 'Content-Type': 'application/octet-stream' } },
    );
  }

  /**
   * Find pet by ID
   * Returns a single pet
   * @param petId  *number* **(REQUIRED)** , in path. ID of pet to return
   * @returns
   */
  async getPetById(petId: number) {
    return this.getOne<IPetModel>(`/pet/${petId}`);
  }

  /**
   * Updates a pet in the store with form data
   *
   * @param petId  *number* **(REQUIRED)** , in path. ID of pet that needs to be updated
   * @param name  *string*, in query. Name of pet that needs to be updated
   * @param status  *string*, in query. Status of pet that needs to be updated
   * @returns
   */
  async updatePetWithForm(petId: number, name: string, status: string) {
    return this.post<any>(`/pet/${petId}?name=${name}&status=${status}`);
  }

  /**
   * Deletes a pet
   * delete a pet
   * @param petId  *number* **(REQUIRED)** , in path. Pet id to delete
   * @returns
   */
  async deletePet(petId: number) {
    return this.delete<any>(`/pet/${petId}`);
  }

  /**
   * Finds Pets by tags
   * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
   * @param tags  *string[]*, in query. Tags to filter by
   * @returns
   */
  async findPetsByTags(tags: string[]) {
    return this.getOne<IPetModel>(`/pet/findByTags?tags=${tags}`);
  }

  /**
   * Finds Pets by status
   * Multiple status values can be provided with comma separated strings
   * @param status  *string*, in query. Status values that need to be considered for filter
   * @returns
   */
  async findPetsByStatus(status: string) {
    return this.getOne<IPetModel>(`/pet/findByStatus?status=${status}`);
  }

  /**
   * Update an existing pet
   * Update an existing pet by Id

    * @returns
    */
  async updatePet() {
    return this.put<IPetModel>(`/pet`);
  }

  /**
   * Add a new pet to the store
   * Add a new pet to the store

    * @returns
    */
  async addPet() {
    return this.post<IPetModel>(`/pet`);
  }
}

export const petApi = new PetApi();
