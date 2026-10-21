# MK Banho e Tosa — Banho & Tosa

Landing page estática em HTML, CSS e JavaScript. GSAP 3.13.0 + ScrollTrigger locais. Sem framework, backend, banco de dados, autenticação ou armazenamento de dados pessoais.

## Abrir e editar

O site completo está em `dist/`. Abra `dist/index.html` no navegador ou sirva essa pasta com qualquer servidor HTTP estático. Não exige instalação nem build. Para hospedar em outra plataforma, envie todo o conteúdo de `dist/`.

- `dist/index.html`: conteúdo editorial, textos, estrutura semântica e metadados.
- `dist/styles.css`: identidade, cores em variáveis CSS, componentes e adaptação responsiva.
- `dist/config.js`: dados comerciais, serviços e textos da mensagem.
- `dist/app.js`: menu, validação, WhatsApp, configuração pública e animações.
- `dist/assets/`: imagens WebP, favicon ilustrativo, GSAP e ScrollTrigger.
- `.openai/hosting.json`: identidade e configuração do Site privado.

## Configurar os dados reais

Edite `dist/config.js`:

1. `whatsapp`: configurado como `5511950332336`, correspondente a `(11) 95033-2336`. Para substituir, use o formato internacional, somente dígitos, começando com 55 e DDD. Vazio ou inválido mantém a demonstração.
2. `whatsappLabel`: texto de contato opcional.
3. `instagram` e `instagramLabel`: URL HTTPS e identificação oficial.
4. `address`, `openingHours` e `maps`: endereço, horários e link HTTPS confirmado do Google Maps.
5. `logo`: caminho do logotipo oficial quando estiver disponível. O arquivo é exibido inteiro, sem recortes. Na ausência dele, usa-se uma assinatura tipográfica complementar; não é uma reprodução do logotipo oficial.
6. `services`: opções confirmadas do formulário. Ao alterar nomes, alinhe também os cards e seus atributos `data-service` em `index.html`.
7. `texts`: saudação, solicitação, encerramento e aviso de demonstração.

Os textos editoriais ficam concentrados no HTML, sem duplicação em templates. Se publicar em outro domínio, ajuste `og:url` e o endereço absoluto de `og:image` no HTML.

## Funcionamento do formulário

Tutor, pet, serviço e porte obrigatórios; data opcional e período com “Sem preferência”. Datas anteriores ao dia local são rejeitadas. Dados ficam apenas na memória da página. O botão constrói a mensagem com `encodeURIComponent` e abre `https://wa.me/NUMERO?text=...`, sem enviá-la automaticamente.

Sem telefone configurado, não ocorre navegação ao WhatsApp: aparece a prévia da mensagem e um aviso. Com telefone, permanece a instrução de que o horário depende da confirmação da equipe. Um link alternativo permite abrir a conversa caso o navegador bloqueie a nova aba.

Sem JavaScript, navegação, conteúdo e FAQ continuam acessíveis; o botão de formulário fica desativado, com explicação. Se GSAP falhar, o conteúdo continua visível. A preferência de movimento reduzido elimina as animações e o scroll suave. Movimentos ambientais são limitados ao desktop e pausam fora de vista ou em aba oculta.

## Assets e referências

O anexo recebido continha apenas texto. Pendentes: logotipo original, capturas BarkBox, fotos autorizadas do estabelecimento/pets e todos os dados comerciais. Não há depoimentos, preços, certificações, histórico, clientes reais nem atendimento a gatos inventados.

O hero foi gerado com a ferramenta integrada imagegen e convertido para WebP preservando transparência. Prompt utilizado: “Create a photorealistic premium pet grooming advertising cutout, isolated on genuinely transparent background. One extremely cute golden retriever, sitting upright, front view, entire dog including both front paws fully visible, happy friendly open mouth with pink tongue, warm honey golden fluffy fur, beautiful expressive dark eyes, wearing a small plain turquoise bandana. Head subtly tilted. Premium commercial studio photography, soft natural light, carefully detailed wispy fur edges, true anatomy. Portrait composition, dog fills frame with modest transparent margins, no objects, no pedestal, no text, no logo, no graphic elements. This is a hero image for Brazilian MK Banho e Tosa dog grooming landing page, cutout to overlap a pastel yellow circle.” Arquivo final: `dist/assets/hero-dog.webp`.

Fotografias ilustrativas locais, obtidas do Unsplash:

- `dog-small.webp`: https://images.unsplash.com/photo-1583337130417-3346a1be7dee
- `golden.webp`: https://images.unsplash.com/photo-1552053831-71594a27632d
- `dog-outdoor.webp`: https://images.unsplash.com/photo-1587300003388-59208cc962cb
- `dog-portrait.webp`: https://images.unsplash.com/photo-1517849845537-4d257902454a

As legendas do site identificam as imagens como ilustrativas. Substitua por material autorizado antes de apresentar fotos como trabalhos da empresa. Mantenha proporções e pontos de enquadramento ao substituir imagens.

Google Fonts: Nunito (display) e DM Sans (texto), com fallback sans-serif. A tipografia é carregada do Google; imagens e animações são locais. Referência de animação consultada: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/ . Bibliotecas mantêm seus avisos de licença nos cabeçalhos.

A referência Behance fornecida retornou HTTP 403; a direção foi desenvolvida a partir da descrição no briefing, sem alegar inspeção visual daquela página.

## Verificação executada

Edge/Playwright local: larguras 1440, 1024, 768, 390 e 320 px. Sem overflow horizontal, imagens quebradas, âncoras inválidas ou erros de console na execução final. Inspeção visual de desktop e mobile. Menu abre, fecha por Escape e após navegar. Card preenche serviço. Campos obrigatórios, data passada, data opcional e prévia de demonstração verificados.

Ramo com WhatsApp configurado testado por configuração efêmera interceptada: a abertura de janela foi substituída por captura da URL, sem contato com número algum. Codificação Unicode, `&`, acentos e correspondência integral da mensagem confirmadas. Configuração entregue permanece vazia.

FAQ, ausência de armazenamento local/de sessão, funcionamento sem JavaScript, registro do ScrollTrigger e zero animações GSAP ativas com movimento reduzido verificados. Sintaxe dos dois arquivos JavaScript validada com `node --check`. Projeto buildless: build não se aplica.

Não realizados: envio real no WhatsApp, auditoria completa com leitor de tela, medição de Core Web Vitals em produção ou testes em aparelhos físicos. A análise não equivale a certificação de acessibilidade.
