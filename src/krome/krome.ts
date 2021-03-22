import { HotReloader } from '../hot-reloader';
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

  constructor(private hotReloader?: HotReloader) {}

  public set hotReload(value: boolean) {
    if (!this.hotReloader) {
      return;
    }
    value ? this.hotReloader.start() : this.hotReloader.stop();
  }
}
