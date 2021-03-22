import { HotReloader } from './hot-reloader';
import { Krome } from './krome';
import { ScriptLoader } from './script-loader';

const hotReloader = new HotReloader();
const krome = new Krome(hotReloader);
new ScriptLoader(krome);
krome.hotReload = true;

export { toPromise } from './utils';
export { krome };
