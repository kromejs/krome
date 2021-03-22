import { watchChanges } from './watchChanges';

export class HotReloader {
  private watcherId: number = null;

  public start(): void {
    if (this.watcherId) {
      return;
    }

    chrome.management.getSelf(async self => {
      if (self.installType === 'development') {
        console.log(
          `[krome] start hot reload at ${new Date().toLocaleString()}`,
        );
        this.watcherId = await watchChanges();
      }
    });
  }

  public stop(): void {
    window.clearInterval(this.watcherId);
  }
}
