import { THEME_STORAGE_KEY } from './theme-types';

/**
 * Runs in <head> before first paint: applies the saved (or system) theme to <html data-theme>
 * so there is no flash of the wrong theme. Kept tiny and dependency-free on purpose.
 */
export const themeScript = `(function(){try{var p=localStorage.getItem('${THEME_STORAGE_KEY}');var d=p==='dark'||(p!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';}catch(e){}})();`;
