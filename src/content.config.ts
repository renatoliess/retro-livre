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
  // TODO(human): implementar a regra de licença.
  return null;
}

const jogos = defineCollection({
  // Arquivos começando com "_" (como _modelo.json) são ignorados.
  loader: glob({ pattern: '[!_]*.json', base: './src/content/jogos' }),
  schema: jogoSchema.superRefine((jogo, ctx) => {
    const motivo = motivoBloqueio(jogo);
    if (motivo) ctx.addIssue({ code: 'custom', message: `Jogo bloqueado: ${motivo}` });
  }),
});

export const collections = { jogos };
