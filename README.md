# Retrô Livre

Site de jogos para jogar no navegador, grátis e sem cadastro:

- **Homebrews retrô**: jogos novos para consoles antigos (NES, Game Boy, GBA, Atari 2600, PC Engine),
  publicados só com licença livre ou permissão escrita do autor.
- **Educativos** e **bíblicos**: jogos próprios em HTML5 com visual retrô.

Mantido por anúncios do Google, sempre fora da área do jogo.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:4321/retro-livre/
npm run build    # gera dist/ e valida o catálogo
```

## Adicionar um jogo homebrew

1. Copie `src/content/jogos/_modelo.json` para `src/content/jogos/<slug>.json`.
2. Preencha a licença e o link da prova (página da licença ou registro da permissão do autor).
3. Coloque o arquivo do jogo em `public/roms/`.
4. Rode `npm run build`. Se a licença não for aceita, a compilação falha e explica o motivo.

Regras: licenças "não comercial" (NC) não servem, porque o site tem anúncios. Jogos comerciais
(Nintendo, SNK etc.) não entram. Neo Geo fica fora, porque exige a BIOS original.

## Remoção de conteúdo

Autores podem pedir a retirada de um jogo abrindo uma *issue*. O prazo é de até 48 horas.

## Licença

Código sob GPL-3.0-or-later (compatível com o EmulatorJS, GPL-3.0). Cada jogo mantém a
licença do seu autor, indicada na página do jogo.
