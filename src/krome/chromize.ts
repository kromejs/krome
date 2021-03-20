import { toPromise } from '../utils';

function methodMap(prop: unknown) {
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
        // Note: subGetter is the case of sinon-chrome
        result[subKey] = toPromise(subGetter);
      } else {
        result[subKey] = methodMap(subProp);
      }
    },
  );
  return result;
}

const chromize: ClassDecorator = ctor => {
  const apiMap = methodMap(chrome);
  Object.assign(ctor.prototype, apiMap);
};

export default chromize;
