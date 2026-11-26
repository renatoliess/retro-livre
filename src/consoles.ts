// Só consoles cujo núcleo do EmulatorJS permite uso comercial (o site tem anúncios).
// "sistema" é o valor de EJS_core; o EmulatorJS carrega para ele o núcleo indicado em "nucleo".
// Antes de adicionar um console, confira a licença do núcleo no repositório dele.
export const CONSOLES = {
  nes: { nome: 'NES', sistema: 'nes', nucleo: 'fceumm', licencaNucleo: 'GPL-2.0' },
  gb: { nome: 'Game Boy', sistema: 'gb', nucleo: 'gambatte', licencaNucleo: 'GPL-2.0' },
  gbc: { nome: 'Game Boy Color', sistema: 'gb', nucleo: 'gambatte', licencaNucleo: 'GPL-2.0' },
  gba: { nome: 'Game Boy Advance', sistema: 'gba', nucleo: 'mgba', licencaNucleo: 'MPL-2.0' },
  atari2600: { nome: 'Atari 2600', sistema: 'atari2600', nucleo: 'stella2014', licencaNucleo: 'GPL-2.0' },
  pce: { nome: 'PC Engine', sistema: 'pce', nucleo: 'mednafen_pce', licencaNucleo: 'GPL-2.0' },
} as const;

export type ConsoleId = keyof typeof CONSOLES;
export const CONSOLE_IDS = Object.keys(CONSOLES) as [ConsoleId, ...ConsoleId[]];
