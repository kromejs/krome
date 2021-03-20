import { toPromise } from '../utils';
import { ChromeProps, ChromeMethod } from './interfaces';

/**
 * Travers all callback-style function properties and returnthe same object structure
 * that has the promise-style functions.
 */
function promisifyMethods(prop: unknown): ChromeProps | ChromeMethod {
  let dtors: Record<string, PropertyDescriptor>;
  try {
    // Note: some deprecated APIs would throw error
    dtors = Object.getOwnPropertyDescriptors(prop);
  } catch {
    return {};
  }

  const result = {};
  (Object.entries(dtors) as [string, PropertyDescriptor][]).forEach(
    ([subKey, { value: subProp, get: subGetter }]) => {
      if (subKey.startsWith('_')) return;
      if (subKey.startsWith('on')) return;
      if (Array.isArray(subProp)) return;
      if (typeof subProp === 'string') return;

      if (typeof subProp === 'function') {
        result[subKey] = toPromise(subProp);
      } else if (typeof subGetter === 'function') {
        // Note: subGetter is for the case of sinon-chrome
        result[subKey] = toPromise(subGetter);
      } else {
        result[subKey] = promisifyMethods(subProp);
      }
    },
  );
  return result;
}

/**
 * Append the promisified chrome APIs to the class
 */
const chromize: ClassDecorator = ctor => {
  const apiMap = promisifyMethods(chrome);
  Object.assign(ctor.prototype, apiMap);
};

export default chromize;
