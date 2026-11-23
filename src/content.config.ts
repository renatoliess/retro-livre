import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CONSOLE_IDS } from './consoles';

const jogoSchema = z.object({
  titulo: z.string().min(1),
  console: z.enum(CONSOLE_IDS),
  autor: z.string().min(1),
  ano: z.number().int().min(1972).max(2100),
  /** Identificador da licença (ex.: "CC-BY-4.0", "GPL-3.0", "MIT") ou "permissao-autor". */
  licenca: z.string().min(1),
  /** Link público para a licença ou para o registro da permissão do autor. */
  prova_url: z.url(),
  /** Data em que a prova foi conferida (AAAA-MM-DD). */
  prova_data: z.coerce.date(),
  /** Arquivo em public/roms/. */
  rom: z.string().min(1),
  capa: z.string().optional(),
  descricao: z.object({ pt: z.string().min(80), en: z.string().min(80) }),
});

export type Jogo = z.infer<typeof jogoSchema>;

/**
 * Decide se um jogo pode ser publicado no site.
 * Retorna `null` se estiver tudo certo, ou uma mensagem explicando o bloqueio
 * (a mensagem aparece no erro do `npm run build`).
 */
export function motivoBloqueio(jogo: Jogo): string | null {
  const licenca = jogo.licenca.trim().toUpperCase();

  // Lista fechada: só entra o que foi conferido como livre para uso comercial.
  if (!LICENCAS_PERMITIDAS.has(licenca)) {
    const dica = /\b(NC|ND)\b|NONCOMMERCIAL|NO-?DERIV/.test(licenca)
      ? ' Licenças "não comercial" (NC) ou "sem derivações" (ND) não servem, porque o site tem anúncios.'
      : ` Aceitas: ${[...LICENCAS_PERMITIDAS].join(', ')}.`;
    return `licença "${jogo.licenca}" não está na lista permitida.${dica}`;
  }

  if (!jogo.prova_url.startsWith('https://')) {
    return 'a prova da liberação precisa ser um link https.';
  }

  if (jogo.prova_data.getTime() > Date.now()) {
    return 'a data da prova está no futuro.';
  }

  return null;
}

/** Licenças aceitas (em maiúsculas). "PERMISSAO-AUTOR" exige link para o registro da permissão. */
const LICENCAS_PERMITIDAS = new Set([
  'CC0-1.0',
  'CC-BY-3.0',
  'CC-BY-4.0',
  'CC-BY-SA-3.0',
  'CC-BY-SA-4.0',
  'MIT',
  'BSD-2-CLAUSE',
  'BSD-3-CLAUSE',
  'ZLIB',
  'GPL-2.0',
  'GPL-3.0',
  'PUBLIC-DOMAIN',
  'PERMISSAO-AUTOR',
]);

const jogos = defineCollection({
  // Arquivos começando com "_" (como _modelo.json) são ignorados.
  loader: glob({ pattern: '[!_]*.json', base: './src/content/jogos' }),
  schema: jogoSchema.superRefine((jogo, ctx) => {
    const motivo = motivoBloqueio(jogo);
    if (motivo) ctx.addIssue({ code: 'custom', message: `Jogo bloqueado: ${motivo}` });
  }),
});

export const collections = { jogos };
