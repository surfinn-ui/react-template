import { ApiBase } from './api.base';
import { ICharacterModel } from '../../models/Character.model';

class CharacterApi extends ApiBase {
  url = '/character';

  /**
   * Fetch Characters list
   *
   * @param urlOrParams url or params
   * @returns
   */
  fetch(urlOrParams?: string | { [key: string]: any }) {
    const url = typeof urlOrParams === 'string' ? urlOrParams : this.url;
    const payload = typeof urlOrParams === 'string' ? undefined : urlOrParams;
    return this.getAll<ICharacterModel>(url, payload);
  }

  /**
   * Fetch a Character by id
   *
   * @param id of Character
   * @returns
   */
  one(id: number) {
    return this.get<ICharacterModel>(`${this.url}/${id}`);
  }

  /**
   * Create a Character
   *
   * @param payload of Character
   * @returns created model
   */
  add(payload: ICharacterModel) {
    return this.post<ICharacterModel>(this.url, payload);
  }

  /**
   * Update a Character
   *
   * @param payload All properties of a Character
   * @returns updated model
   */
  update(payload: ICharacterModel) {
    return this.put<ICharacterModel>(`${this.url}/${payload.id}`, payload);
  }

  /**
   * Patch a Character
   *
   * @param payload Some properties of a Character
   * @returns patched model
   */
  modify(payload: ICharacterModel) {
    return this.patch<ICharacterModel>(`${this.url}/${payload.id}`, payload);
  }

  /**
   * Remove a Character
   *
   * @param payload a Character or id
   * @returns nothing
   */
  remove(payload: number | ICharacterModel) {
    return this.delete(
      `${this.url}/${typeof payload === 'number' ? payload : payload.id}`,
    );
  }

  /**
   * Remove all Characters in the array
   *
   * @param payload Characters or ids
   * @returns nothing
   */
  removeAll(payload: (number | ICharacterModel)[]) {
    const ids = payload.map((item) =>
      typeof item === 'number' ? item : item.id,
    );
    return this.delete(this.url, { id: ids });
  }

  // Please fill out the additional API method below.
}

export const characterApi = new CharacterApi();
