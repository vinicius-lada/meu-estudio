# Histórico de decisões

Somente escolhas explícitas. Propostas ficam nos documentos de discussão.

## 15/10/2026 — começar o projeto de música

- Pedido: preparar o projeto, criar pasta e README e consultar a organização do Volax.
- Destino pedido: pasta outputs/musica do projeto de 26/09/2026.
- Organização executada: subpasta site, preservando os arquivos existentes do professor de música.
- Estágio: preparação e discussão; não implementação nem publicação.

## 15/10/2026 — participação visual e registro

- Pedido: o usuário quer escolher todas as decisões visuais e guardar as escolhas como sua identidade visual.
- Consequência: discutir direção antes de aplicar; usar exemplos para escolhas visuais.
- Registro autorizado: 03_DESIGN_DNA.md guarda as regras vigentes e este arquivo guarda o histórico.
- Limite: ainda não existe escolha visual aprovada. Não generalizar uma escolha do site para outros projetos sem indicação do usuário.

## 15/10/2026 — estúdio, coleção e exploração de cor

- Escolha explícita: estúdio pessoal para destacar músicas em aprendizado, junto de biblioteca com discos/capas e organização do repertório.
- Preferência relatada: minimalismo e interações com personalidade, como clicar num disco para acessar músicas. Ainda não transformar “divertido” em regra de movimento ou gamificação.
- Referências enviadas: Radiooooo para personalidade visual; Rate Your Music para ideia de biblioteca e avaliações, sem copiar o produto.
- Paleta enviada: Violet Dusk (#502D55, #935073, #F6DBC0, #F8F4E9), com preferência tentativa por mais preto.
- Pedido autorizado: mostrar um protótipo de cor e pesquisar links para escolher elementos de referência.
- Entrega: estudo local A/B em estudos/01-violet-dusk.html. Composição, fonte, textos e detalhes são propostas; cor final ainda depende da avaliação do usuário.
- Alcance: registrado no projeto como base da identidade em construção. Aplicação automática a outros projetos não foi autorizada.

## 15/10/2026 — retorno sobre referências

- Preferências relatadas: aparência de aparelho antigo, botões quadrados, fonte e telinha central do Poolsuite; tipografia e resposta dinâmica aos cliques do Teenage Engineering.
- Incômodo relatado: página longa demais na referência Teenage Engineering.
- Princípio de interação escolhido: algo perceptível acontece quando se clica; exemplo exploratório do usuário é o disco girar.
- Patatap permanece referência pontual de resposta à ação, não direção para o produto inteiro. Não há aprovação de sons ou flashes.
- Pendências: onde aplicar o retrô, tipografia exata, composição e variante de paleta. Nenhuma nova tela foi implementada neste registro.
- Alcance: preferências registradas na identidade em construção deste projeto; não aplicadas a outros projetos.

## 15/10/2026 — composição A, cor B

- Escolha explícita: aparelho retrô dentro do estúdio, com biblioteca ao redor (opção A de composição).
- Escolha explícita: começar pelo quase preto com detalhes roxos (opção B de cor).
- Motivo informado: transformar o site inteiro em aparelho parece complexo; prefere concentrar o esforço na primeira versão escura.
- O usuário gosta bastante do violeta e cogita alternância no futuro, mas decidiu adiar essa funcionalidade.
- Consequência: estudo 02 segue essa direção; o estudo 01 é preservado como histórico. Fonte, detalhes e textos do novo estudo continuam experimentais.
- Substitui o estado anterior de cor e encaixe visual indefinidos. Não muda regras de outros projetos.

## 15/10/2026 — retrô consistente com biblioteca normal

- Usuário escolheu a primeira opção: compartilhar fonte, contornos, cores e botões do aparelho com o restante da página.
- Limite explícito: biblioteca continua uma biblioteca normal; não precisa imitar computador, janela ou telinha.
- Motivo: gostou do aparelho e quer que a biblioteca tenha visual semelhante.
- Estudo 03 aplica essa direção; medidas e acabamento ainda sujeitos à avaliação.
- Refina a composição A, mantém quase preto com detalhes roxos e alternância de tema adiada.

## 15/10/2026 — texto funcional e capas provisórias

- Pedido: retirar frases genéricas e irrelevantes usadas para preencher a tela.
- Regra escolhida: textos curtos com função, sem slogans ou frases motivacionais decorativas.
- O usuário gostou especialmente das abas da biblioteca. Mantidas.
- Capas consideradas estranhas, mas aceitáveis por enquanto; revisão adiada sem presumir a causa do incômodo.
- Estudo 03 atualizado no mesmo endereço. Mantidos layout, funcionalidades e capas.

## Modelo de novo registro

- Data e decisão:
- Escolha do usuário:
- Motivo informado:
- Alcance: site ou identidade pessoal reutilizável:
- Consequência na interface:
- Referência visual:
- Substitui decisão anterior?:


## 15/10/2026 — aplicação utilizável e materiais de estudo
- Usuário aceitou TypeScript + React + Vite e gravação no navegador inicialmente.
- Uso prioritário no celular; sincronização futura necessária, ainda sem provedor/arquitetura de nuvem escolhidos.
- Busca por música e artista, link, anotações e referências de aulas (principalmente YouTube).
- Partitura precisa abrir no site. Primeiro caminho: upload de imagem/PDF, uma das alternativas mencionadas pelo usuário. Integração automática não escolhida.
- Implementação local inclui IndexedDB, exportação/importação com anexos, estados da biblioteca e leitor PDF. Não houve publicação.
- Visual do estudo 03 mantido; capas provisórias e tema alternativo continuam para discussão futura.

## 16/10/2026 — sincronização entre celular e PC
- Usuário pediu para avançar com a versão online e sincronizada.
- A primeira alternativa com Cloudflare foi interrompida antes de publicação e sem envio de repertório pessoal, porque R2 tinha cobrança por uso fora da expectativa. Ela não faz parte da arquitetura vigente.
- Arquitetura vigente: GitHub Pages publica o site estático; Appwrite Education guarda a biblioteca e as partituras privadas. Login será por e-mail e senha da própria conta Appwrite, permitindo entrar no celular e no computador.
- O usuário pediu que não seja usado nenhum recurso Cloudflare neste projeto. A configuração e o código Cloudflare foram removidos da aplicação.
- A criação do projeto Appwrite, bucket e repositório ainda depende da conta do usuário, pois não há conexão de conta disponível neste ambiente.
