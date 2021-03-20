import { PromiseCallback } from '../utils';

const chromeProps = [
  'app',
  'dom',
  'i18n',
  'management',
  'permissions',
  'runtime',
  'tabs',
  'windows',
] as const;

export type ChromeProps = {
  [k in typeof chromeProps[number]]: {
    [k: string]: PromiseCallback;
  };
};
