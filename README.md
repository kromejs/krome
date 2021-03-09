# crx-esm
![Version](https://img.shields.io/github/package-json/v/hankchiutw/crx-esm?label=package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/hankchiutw/crx-esm/blob/main/LICENSE)

> Utils as ES modules for chrome extension development

##### Features
- Hot reload for development installation.
- Load content script programmatically.
- Helper to convert chrome extension API(v2) to Promise-based.

## Install

```sh
yarn add crx-esm
```

## Usage
> background.js
```js
import { ScriptLoader, enableHotReload } from 'crx-esm';

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

See [examples](examples) for workable examples.

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
import { enableHotReload } from 'crx-esm';
enableHotReload();
```

- #### toPromise
> Convert the legacy callback-based APIs to Promise-based.

See this introductory article: [A simple technique to promisify Chrome extension API](https://dev.to/hankchiutw/a-simple-technique-to-promisify-chrome-extension-api-1e0c).
```js
import { toPromise } from 'crx-esm';
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

## Author

👤 **hankchiutw**

* Website: https://hankchiu.tw
* Twitter: [@hankchiutw](https://twitter.com/hankchiutw)
* Github: [@hankchiutw](https://github.com/hankchiutw)
* LinkedIn: [@hankchiutw](https://linkedin.com/in/hankchiutw)

## Show your support

Give a ⭐️ if this project helped you!
