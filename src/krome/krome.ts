import chromize from './chromize';

type ChromeProps = typeof chrome;

// Note: declare the same interface and class name
// to have correct type checking after decorating.
// see: https://github.com/microsoft/TypeScript/issues/26792#issuecomment-617541464
export interface Krome extends ChromeProps {
  contentScript: string;
}

@chromize
export class Krome {}
