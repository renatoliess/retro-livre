// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages de projeto: https://renatoliess.github.io/retro-livre/
// Quando houver domínio próprio, troque `site` pelo domínio e `base` por '/'.
export default defineConfig({
  site: 'https://renatoliess.github.io',
  base: '/retro-livre',
  trailingSlash: 'always',
  i18n: {
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
});
