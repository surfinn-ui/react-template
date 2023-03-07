import { ApiBase } from '../ApiBase';
import { IPetModel } from '../../../models/pet/PetModel';
import { IApiResponseModel } from '../../../models/apiResponse/ApiResponseModel';

/**
 * PetApiCore
 *
 * Do not edit this file directly, it is generated by openapi-generator.
 */
export class PetApiCore extends ApiBase {
  /**
   * ## uploads an image
   *
   *
   * @param {number} petId **(REQUIRED)** {int64} ID of pet to update
   * @param {string} [additionalMetadata]  Additional Metadata
   * @param {string} payload **(REQUIRED)** {binary}
   * @returns
   */
  public async uploadFile(
    petId: number,
    payload: string,
    additionalMetadata?: string,
  ) {
    const queries = new URLSearchParams();
    if (additionalMetadata)
      queries.append('additionalMetadata', additionalMetadata);

    return this.create<IApiResponseModel>(
      `/pet/${petId}/uploadImage?${queries.toString()}`,
      payload,
      { headers: { 'Content-Type': 'application/octet-stream' } },
    );
  }

  /**
   * ## Find pet by ID
   * Returns a single pet
   *
   * @param {number} petId **(REQUIRED)** {int64} ID of pet to return
   * @returns
   */
  public async getPetById(petId: number) {
    return this.find<IPetModel>(`/pet/${petId}`);
  }

  /**
   * ## Updates a pet in the store with form data
   *
   *
   * @param {number} petId **(REQUIRED)** {int64} ID of pet that needs to be updated
   * @param {string} [name]  Name of pet that needs to be updated
   * @param {string} [status]  Status of pet that needs to be updated
   * @returns
   */
  public async updatePetWithForm(
    petId: number,
    name?: string,
    status?: string,
  ) {
    const queries = new URLSearchParams();
    if (name) queries.append('name', name);
    if (status) queries.append('status', status);

    return this.update<any>(`/pet/${petId}?${queries.toString()}`);
  }

  /**
   * ## Deletes a pet
   * delete a pet
   *
   * @param {string} [api_key]
   * @param {number} petId **(REQUIRED)** {int64} Pet id to delete
   * @returns
   */
  public async deletePet(petId: number) {
    return this.delete<any>(`/pet/${petId}`);
  }

  /**
   * ## Finds Pets by tags
   * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
   *
   * @param {string[]} [tags]  Tags to filter by
   * @returns
   */
  public async findPetsByTags(tags?: string[]) {
    const queries = new URLSearchParams();
    if (tags) queries.append('tags', tags.join(','));

    return this.search<IPetModel>(`/pet/findByTags`, queries);
  }

  /**
   * ## Finds Pets by status
   * Multiple status values can be provided with comma separated strings
   *
   * @param {string} [status]  Status values that need to be considered for filter
   * @returns
   */
  public async findPetsByStatus(status?: string) {
    const queries = new URLSearchParams();
    if (status) queries.append('status', status);

    return this.search<IPetModel>(`/pet/findByStatus`, queries);
  }

  /**
   * ## Update an existing pet
   * Update an existing pet by Id
   *
   * @param {IPetModel} payload **(REQUIRED)**   Update an existent pet in the store
   * @returns
   */
  public async updatePet(payload: IPetModel) {
    return this.update<IPetModel>(`/pet`, payload);
  }

  /**
   * ## Add a new pet to the store
   * Add a new pet to the store
   *
   * @param {IPetModel} payload **(REQUIRED)**   Create a new pet in the store
   * @returns
   */
  public async addPet(payload: IPetModel) {
    return this.create<IPetModel>(`/pet`, payload);
  }
}