import { types } from 'mobx-state-tree';

/**
 * Generated TagModelProps
 *
 * Do not edit this file directly, it is generated by openapi-generator.
 */
export const TagModelProps = {
  // ^ Model Properties generated by openapi-generator
  /**
   * @type integer
   * @format int64
   * @required
   */
  id: types.maybeNull(types.identifierNumber),
  /**
   * @type string
   * @required
   */
  name: types.string,
  // $ Model Properties generated by openapi-generator
};
