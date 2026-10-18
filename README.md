# Meu estúdio

Aplicação pessoal para organizar músicas que você quer aprender, está aprendendo e já sabe tocar. Feita em TypeScript, React e Vite, mantendo a linguagem visual de aparelho retrô e biblioteca escura aprovada nos estudos.

## O que já funciona

- Busca de música e artista pelo catálogo iTunes/Apple, ou cadastro manual.
- Instrumento, situação, link da música, anotações e links de aulas.
- Biblioteca com filtros **Todas**, **Quero aprender**, **Aprendendo** e **Já sei tocar**.
- Partituras em PNG, JPG, WebP ou PDF de até 20 MB, com leitor interno e ampliação.
- Edição, exclusão, exportação e importação de backup.
- Uso local no navegador, mesmo antes de a sincronização ficar configurada.
- Sincronização com **Appwrite**: uma conta por e-mail e senha permite usar a mesma biblioteca no celular e no computador. PDFs e imagens ficam privados na conta do usuário.

## Rodar no computador

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo terminal. `npm run build` faz a verificação de tipos e gera a pasta `dist`.

## Publicar no GitHub Pages e ligar o Appwrite

1. Crie um repositório no GitHub e envie esta pasta para a branch `main`.
2. No repositório, abra **Settings → Pages**, escolha **GitHub Actions** como fonte. O arquivo `.github/workflows/deploy-pages.yml` publica cada atualização da `main`.
3. Ative a conta pelo [Appwrite Education](https://appwrite.io/education), usando a conta GitHub que já tem o Student Pack.
4. No Appwrite, crie um projeto e adicione um app **Web** com o domínio `SEU-USUARIO.github.io`.
5. Em **Storage**, crie um bucket com ID `estudio`. Em Settings, ative **File Security** e conceda somente **Create** para o papel **Users**. Não conceda permissão a **Any**. Cada arquivo recebe depois permissões individuais do seu dono.
6. Copie o endpoint, ID do projeto e ID do bucket para `public/appwrite-config.json`. Esses identificadores podem aparecer no navegador; **não** coloque uma chave de API nesse arquivo.
7. Faça novo envio ao GitHub. No site publicado, abra **Sincronizar celular e PC**, crie sua conta uma vez e depois entre com ela no outro aparelho.

O Appwrite aplica permissões no arquivo: cada música, biblioteca e partitura criada pelo site é acessível somente pela conta que a criou. O GitHub Pages só hospeda o código público; não recebe sua biblioteca.

## Organização

- `src/main.tsx`: interface, ficha, leitor e fluxo de sincronização.
- `src/data.ts`: modelo, busca, IndexedDB e backup local.
- `src/remote.ts`: autenticação e arquivos privados no Appwrite.
- `public/appwrite-config.json`: configurações públicas necessárias para o navegador conversar com seu projeto Appwrite.
- `.github/workflows/deploy-pages.yml`: publicação automática no GitHub Pages.
- `estudos/`: protótipos visuais e referência de paleta.

## Verificação

Em 16/10/2026, `npm run build` passou após a migração para o SDK Appwrite. A conexão real será conferida depois de criar o projeto Appwrite e preencher os três IDs no arquivo de configuração.

Fonte da busca: [iTunes Search API](https://performance-partners.apple.com/search-api).
