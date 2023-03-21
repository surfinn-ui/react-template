/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Hyeongjin Yong.
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 * @link https://jcward.com/UUID.js
 * @link https://github.com/uuidjs/uuid/blob/7ce4e9aaf5/src/regex.js
 * @link https://github.com/uuidjs/uuid/blob/7ce4e9aaf5/src/validate.js
 */
const lut: string[] = [];
for (let i = 0; i < 256; i++) {
  lut[i] = (i < 16 ? '0' : '') + i.toString(16).toUpperCase();
}

/**
 * Create a version 4 (random) UUID
 * @returns uuid v4
 */
export const generate = () => {
  const d0 = (Math.random() * 0xffffffff) | 0;
  const d1 = (Math.random() * 0xffffffff) | 0;
  const d2 = (Math.random() * 0xffffffff) | 0;
  const d3 = (Math.random() * 0xffffffff) | 0;
  return (
    lut[d0 & 0xff] +
    lut[(d0 >> 8) & 0xff] +
    lut[(d0 >> 16) & 0xff] +
    lut[(d0 >> 24) & 0xff] +
    '-' +
    lut[d1 & 0xff] +
    lut[(d1 >> 8) & 0xff] +
    '-' +
    lut[((d1 >> 16) & 0x0f) | 0x40] + // version 4
    lut[(d1 >> 24) & 0xff] +
    '-' +
    lut[(d2 & 0x3f) | 0x80] + // 8, 9, a, b 로 고정
    lut[(d2 >> 8) & 0xff] +
    '-' +
    lut[(d2 >> 16) & 0xff] +
    lut[(d2 >> 24) & 0xff] +
    lut[d3 & 0xff] +
    lut[(d3 >> 8) & 0xff] +
    lut[(d3 >> 16) & 0xff] +
    lut[(d3 >> 24) & 0xff]
  );
};

/**
 * Test the string to see it is a valid UUID version 4.
 * @param uuid
 * @returns true if the uuid is a valid UUID version 4, false otherwise.
 */
export const validate = (uuid: string) => {
  return /^(?:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i.test(
    uuid,
  );
};

const UUID = {
  v4: generate,
  validate,
};

export default UUID;
