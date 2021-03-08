import { ScriptLoader, enableHotReload } from '../src';

enableHotReload();

const loader = new ScriptLoader();
loader.contentScript = 'content.js';
loader.injectOnClicked = true;
loader.injectOnCommands = ['toggle-my-crx'];
