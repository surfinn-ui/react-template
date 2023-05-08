function path(root: string, sublink: string) {
  return `${root}/${sublink}`;
}

const ROOT_PATH = '/';

export const MAIN_PATH = path(ROOT_PATH, 'main');
export const DEMO_PATH = path(ROOT_PATH, 'demo');

export const ERROR_401_PATH = path(ROOT_PATH, 'error/401');
export const ERROR_402_PATH = path(ROOT_PATH, 'error/402');
export const ERROR_403_PATH = path(ROOT_PATH, 'error/403');
export const ERROR_404_PATH = path(ROOT_PATH, 'error/404');

export const ERROR_500_PATH = path(ROOT_PATH, 'error/500');
export const ERROR_501_PATH = path(ROOT_PATH, 'error/501');
export const ERROR_502_PATH = path(ROOT_PATH, 'error/502');
export const ERROR_503_PATH = path(ROOT_PATH, 'error/503');
