import { toPromise } from './to-promise';

interface EventPayload {
  eventName: string;
  detail?: EventDetail;
}

type EventCallback<T> = (detail: EventDetail) => T | Promise<T>;

export type EventDetail = Record<string, unknown>;

export class MessageService {
  private eventMap: {
    [eventName: string]: EventCallback<unknown>;
  } = {};

  constructor() {
    this.handleMessages();
  }

  /**
   * Send message to a {@link chrome.tabs.Tab}.
   */
  public async sendTab<T>(eventName: string, detail = {}): Promise<T> {
    if (!chrome.tabs) {
      return Promise.resolve(null);
    }

    const tabs = await toPromise(chrome.tabs.query)<chrome.tabs.Tab[]>({
      active: true,
      currentWindow: true,
    });

    return toPromise(chrome.tabs.sendMessage)<T>(tabs[0].id, {
      eventName,
      detail,
    } as EventPayload);
  }

  /**
   * Send message to runtime (background script).
   */
  public async send<T>(eventName: string, detail = {}): Promise<T> {
    return toPromise(chrome.runtime.sendMessage)<T>({
      eventName,
      detail,
    } as EventPayload);
  }

  public on<T>(eventName: string, callback: EventCallback<T>) {
    this.eventMap[eventName] = callback;
  }

  private handleMessages() {
    if (!chrome.runtime.onMessage) {
      return;
    }
    chrome.runtime.onMessage.addListener(
      (payload: EventPayload, _sender, sendResponse) => {
        const callback = this.eventMap[payload.eventName];
        if (callback) {
          Promise.resolve(callback(payload.detail)).then(result => {
            sendResponse(result);
          });
        } else {
          sendResponse(null);
        }
        // keep the connection open during the async execution
        return true;
      },
    );
  }
}
