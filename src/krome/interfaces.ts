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

type propTypes = typeof chromeProps[number];
export type ChromeMethod = Record<string, PromiseCallback>;
export type ChromeProps = Record<propTypes, ChromeMethod>;
