# krome
![Version](https://img.shields.io/github/package-json/v/kromejs/krome?label=package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/kromejs/krome/blob/main/LICENSE)

> Modern chrome extension development with ESM

##### Features
- Transform all chrome extension APIs into Promise-style.
- Hot reloader for development installation.
- Load content script programmatically.
- Helper to convert callback-style function to Promise-style.

## Install

```sh
yarn add krome
```

## Usage
Recommand using [create-krome-app](https://www.npmjs.com/package/create-krome-app) to start your project.
> background.js
```js
import 'krome';
```

> background.html
```html
<script type="module" src="background.js"></script>
```

> manifest.json
```json
"background": {
  "page": "background.html",
  "persistent": false
},
"browser_action": {
  "default_title": "Click to launch",
  "name": "Click to launch"
},
"permissions": ["activeTab"],
"content_scripts": [
  {
    "matches": ["https://*/*"],
    "js": ["content.js"]
  }
],
```

## API
- #### krome
> A singleton object with promise-style chrome extension APIs and script loading feature.

##### Promise version chrome extension APIs
All `chrome.*.*` APIs are traversed and transformed programmatically by `toPromise`. Just repalce `chrome` with `krome` to use it, e.g.
```js
import { krome } from 'krome';
krome.tabs.query<chrome.tabs.Tab[]>({}).then(() => {
  // do something
});
```
If you found some API not working correctly, please publish an issue.

##### krome.contentScript (default: 'content.js')
##### krome.injectOnClicked (default: true)
##### krome.injectOnCommands (default: [])
Sometimes we don't want to load the content script automatically for the matches. Use this setting to load content script manually. Require `browser_action` or `commands` in `manifest.json`.

##### krome.hotReload: Setter<boolean>
> Setter to enable/disable hot reloader. Default enabled.

Note: this will not take effect for production installation.

```js
import { krome } from 'krome';
// To disable hot reloader
krome.hotReload = false;
```

- #### toPromise
> Convert the legacy callback-based APIs to Promise-based.

See this introductory article: [A simple technique to promisify Chrome extension API](https://dev.to/hankchiutw/a-simple-technique-to-promisify-chrome-extension-api-1e0c).
```js
import { toPromise } from 'krome';
toPromise(chrome.tabs.query)({}).then(() => {
  // do something
});
```

## Development

```sh
yarn start
yarn bump
yarn build
yarn pub
```

## Show your support

Give a ⭐️ if this project helped you!
