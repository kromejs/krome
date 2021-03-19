# krome
![Version](https://img.shields.io/github/package-json/v/kromejs/krome?label=package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/kromejs/krome/blob/main/LICENSE)

> Modern chrome extension development with ESM

##### Features
- Hot reload for development installation.
- Load content script programmatically.
- Helper to convert chrome extension API(v2) to Promise-based.

## Install

```sh
yarn add krome
```

## Usage
> background.js
```js
import { ScriptLoader, enableHotReload } from 'krome';

enableHotReload();

const loader = new ScriptLoader();
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
```

Recommand using [create-krome-app](https://www.npmjs.com/package/create-krome-app) to start your project.

## API
- #### ScriptLoader
> To load the content script programmatically.

Sometimes we don't want to load the content script automatically for the matches. You can use `ScriptLoader` to load content script from background script. Require `browser_action` or `commands` in `manifest.json`.
 
##### ScriptLoader.contentScript (default: 'content.js')
##### ScriptLoader.injectOnClicked (default: true)
##### ScriptLoader.injectOnCommands (default: [])

- #### enableHotReload
> Hot reload your development installation(unpacked) without reinstall manually.

Note: this will not take effect for production installation.

```js
import { enableHotReload } from 'krome';
enableHotReload();
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
yarn build
yarn bump
yarn pub
```

## Show your support

Give a ⭐️ if this project helped you!
