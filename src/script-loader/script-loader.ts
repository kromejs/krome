import { Krome } from '../krome';

export class ScriptLoader {
  private injectedTabMap = {};

  constructor(private krome: Krome) {
    this.handleTabUpdated();
    this.handleContentInjection();
  }

  public async isInjected(): Promise<boolean> {
    const tabId = await this.getActiveTabId();
    return !!this.injectedTabMap[tabId];
  }

  /**
   * Inject the {@link Krome.contentScript} into the {@link tabId}.
   */
  private async inject(tabId: number): Promise<void> {
    if (this.injectedTabMap[tabId]) {
      return;
    }

    if (
      !this.krome.contentScript ||
      typeof this.krome.contentScript !== 'string'
    ) {
      throw new Error(
        `Not a valid content script: ${this.krome.contentScript}`,
      );
    }

    return this.krome.tabs
      .executeScript(tabId, {
        file: this.krome.contentScript,
      })
      .then(() => {
        this.injectedTabMap[tabId] = true;
      });
  }

  /**
   * Inject content script according to {@link Krome.injectOnClicked} and {@link Krome.injectOnCommands}.
   */
  private handleContentInjection() {
    chrome.browserAction &&
      chrome.browserAction.onClicked.addListener(({ id }) => {
        this.krome.injectOnClicked && this.inject(id);
      });

    chrome.commands &&
      chrome.commands.onCommand.addListener(async (command: string) => {
        if (!Array.isArray(this.krome.injectOnCommands)) {
          return;
        }
        if (this.krome.injectOnCommands.includes(command)) {
          const tabId = await this.getActiveTabId();
          this.inject(tabId);
        }
      });
  }

  private async getActiveTabId(): Promise<number> {
    const tabs = await this.krome.tabs.query<chrome.tabs.Tab[]>({
      active: true,
      currentWindow: true,
    });
    return tabs[0].id;
  }

  /**
   * Keep `injectedTabMap` reliable when tab updated.
   */
  private handleTabUpdated() {
    chrome.tabs.onUpdated.addListener(tabId => {
      delete this.injectedTabMap[tabId];
    });
  }
}
