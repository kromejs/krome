import { watchChanges } from './watchChanges';

export function enableHotReload() {
  chrome.management &&
    chrome.management.getSelf(self => {
      if (self.installType === 'development') {
        console.log(`start hot reload at ${new Date().toLocaleString()}`);
        watchChanges();
      }
    });
}
