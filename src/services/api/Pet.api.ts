import { ApiBase } from './api.base';
import { IApiResponseModel } from '../../models/ApiResponse.model';
import { IPetModel } from '../../models/Pet.model';

class PetApi extends ApiBase {
  url = '/pet';

  /**
   * ## uploads an image
   *
   * @param {number} petId **(REQUIRED)** {int64} ID of pet to update
   * @param {string} [additionalMetadata]  Additional Metadata
   * @param {string} payload **(REQUIRED)** {binary}
   * @returns
   */
  async uploadFile(
    petId: number,
    payload: string,
    additionalMetadata?: string,
  ) {
    return this.post<IApiResponseModel>(
      `${this.url}/${petId}/uploadImage?additionalMetadata=${additionalMetadata}`,
      payload,
      { headers: { 'Content-Type': 'application/octet-stream' } },
    );
  }

  /**
   * ## Find pet by ID
   * Returns a single pet
   * @param {number} petId **(REQUIRED)** {int64} ID of pet to return
   * @returns
   */
  async getPetById(petId: number) {
    return this.getOne<IPetModel>(`${this.url}/${petId}`);
  }

  /**
   * ## Updates a pet in the store with form data
   *
   * @param {number} petId **(REQUIRED)** {int64} ID of pet that needs to be updated
   * @param {string} [name]  Name of pet that needs to be updated
   * @param {string} [status]  Status of pet that needs to be updated
   * @returns
   */
  async updatePetWithForm(petId: number, name?: string, status?: string) {
    return this.post<any>(`${this.url}/${petId}?name=${name}&status=${status}`);
  }

  /**
   * ## Deletes a pet
   * delete a pet
   * @param {string} [api_key]
   * @param {number} petId **(REQUIRED)** {int64} Pet id to delete
   * @returns
   */
  async deletePet(petId: number) {
    return this.delete<any>(`${this.url}/${petId}`);
  }

  /**
   * ## Finds Pets by tags
   * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
   * @param {string[]} [tags]  Tags to filter by
   * @returns
   */
  async findPetsByTags(tags?: string[]) {
    return this.getAll<IPetModel>(`${this.url}/findByTags?tags=${tags}`);
  }

  /**
   * ## Finds Pets by status
   * Multiple status values can be provided with comma separated strings
   * @param {string} [status]  Status values that need to be considered for filter
   * @returns
   */
  async findPetsByStatus(status?: string) {
    return this.getAll<IPetModel>(`${this.url}/findByStatus?status=${status}`);
  }

  /**
   * ## Update an existing pet
   * Update an existing pet by Id
   * @param {any} payload **(REQUIRED)**
   * @returns
   */
  async updatePet(payload: any) {
    return this.put<IPetModel>(`${this.url}`, payload);
  }

  /**
   * ## Add a new pet to the store
   * Add a new pet to the store
   * @param {any} payload **(REQUIRED)**
   * @returns
   */
  async addPet(payload: any) {
    return this.post<IPetModel>(`${this.url}`, payload);
  }
}

export const petApi = new PetApi();
