import { Krome } from './krome';
import { ScriptLoader } from './script-loader';

const krome = new Krome();
new ScriptLoader(krome);

export { enableHotReload } from './hot-reloader';
export { toPromise } from './utils';
export { krome };
