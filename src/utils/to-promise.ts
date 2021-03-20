export type PromiseCallback = <T>(...args: any[]) => Promise<T>;

export function toPromise(callback): PromiseCallback {
  return <T>(...args) => {
    return new Promise<T>(resolve => {
      callback(...args, resolve);
    });
  };
}
