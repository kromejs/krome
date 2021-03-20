import chromize from './chromize';
import { ChromeProps } from './interfaces';

// Note: declare the same interface and class name
// to have correct type checking after decorating.
// see: https://github.com/microsoft/TypeScript/issues/26792#issuecomment-617541464
export interface Krome extends ChromeProps {
  injectOnCommands: string[];
  injectOnClicked: boolean;
  contentScript: string;
}

@chromize
export class Krome {
  public injectOnCommands: string[] = [];
  public injectOnClicked = true;
  public contentScript = 'content.js';
}
