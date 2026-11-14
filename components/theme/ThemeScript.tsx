/**
 * Runs before first paint so the right theme is applied with no flash.
 * Falls back to the visitor's OS setting until they pick one.
 * Requires suppressHydrationWarning on <html> in the root layout.
 */
const script = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export function ThemeScript(): React.JSX.Element {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}