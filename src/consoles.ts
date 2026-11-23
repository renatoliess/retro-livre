// Só consoles cujo núcleo do EmulatorJS permite uso comercial (o site tem anúncios).
// Antes de adicionar um console, confira a licença do núcleo no repositório dele.
export const CONSOLES = {
  nes: { nome: 'NES', nucleo: 'fceumm', licencaNucleo: 'GPL-2.0' },
  gb: { nome: 'Game Boy', nucleo: 'gambatte', licencaNucleo: 'GPL-2.0' },
  gbc: { nome: 'Game Boy Color', nucleo: 'gambatte', licencaNucleo: 'GPL-2.0' },
  gba: { nome: 'Game Boy Advance', nucleo: 'mgba', licencaNucleo: 'MPL-2.0' },
  atari2600: { nome: 'Atari 2600', nucleo: 'stella2014', licencaNucleo: 'GPL-2.0' },
  pce: { nome: 'PC Engine', nucleo: 'mednafen_pce', licencaNucleo: 'GPL-2.0' },
} as const;

export type ConsoleId = keyof typeof CONSOLES;
export const CONSOLE_IDS = Object.keys(CONSOLES) as [ConsoleId, ...ConsoleId[]];
