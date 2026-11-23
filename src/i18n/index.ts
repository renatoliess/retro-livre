import pt from './pt.json';
import en from './en.json';

export const LANGS = ['pt', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export type Chave = keyof typeof pt;

const dicionarios: Record<Lang, Record<Chave, string>> = { pt, en };

/** Texto traduzido; cai para o português se faltar a chave em inglês. */
export function t(lang: Lang, chave: Chave): string {
  return dicionarios[lang][chave] ?? dicionarios.pt[chave];
}

/** Caminho interno já com o `base` do site (necessário no GitHub Pages). */
export function url(caminho: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const limpo = caminho.replace(/^\//, '').replace(/\/?$/, '/');
  return `${base}/${limpo === '/' ? '' : limpo}`;
}

export function outroIdioma(lang: Lang): Lang {
  return lang === 'pt' ? 'en' : 'pt';
}

export const langPaths = () => LANGS.map((lang) => ({ params: { lang } }));
