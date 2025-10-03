import { THEME_STORAGE_KEY } from "./themeConstants";

const ThemeScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          try {
            var storageKey = '${THEME_STORAGE_KEY}';
            var root = document.documentElement;
            var theme = window.localStorage.getItem(storageKey);
            if (!theme) {
              var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
              theme = mediaQuery.matches ? 'dark' : 'light';
            }
            if (theme !== 'light' && theme !== 'dark') {
              theme = 'dark';
            }
            root.classList.remove('light', 'dark');
            root.classList.add(theme);
          } catch (error) {
            document.documentElement.classList.add('dark');
          }
        })();
      `,
    }}
  />
);

export default ThemeScript;
