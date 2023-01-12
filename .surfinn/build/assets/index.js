import * as fs from 'fs';
import * as path from 'path';
export const asset = {
    get: (name) => fs.readFileSync(path.join(__dirname, name), 'ascii'),
};
