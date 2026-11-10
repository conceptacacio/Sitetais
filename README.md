# Interliga Saúde — pacote GitHub Pages

Este diretório contém a landing page estática completa, responsiva e pronta para publicação. A identidade visual existente foi preservada, incluindo o logotipo, o banner, a foto de “Quem somos”, a imagem de reunião em “Nossas soluções” e as fontes Inter e Manrope locais. Não há backend nem etapa de compilação.

## Publicar no GitHub Pages

1. Envie **todo o conteúdo deste diretório** para a raiz do repositório, mantendo `index.html`, `privacy.html` e a pasta `assets/`.
2. No GitHub, acesse **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**, escolha a branch usada (por exemplo, `main`) e a pasta **/(root)**; salve.
4. Aguarde o GitHub Pages concluir a implantação e abra o endereço mostrado nas configurações.

Os caminhos são relativos, então funcionam tanto em um domínio de usuário/organização quanto em um endereço de site de projeto como `usuario.github.io/nome-do-repositorio/`.

## Conteúdo institucional

A página apresenta as três descrições de solução aprovadas no relatório de revisão: prestação de serviços assistenciais; gestão e organização de equipes; continuidade e suporte assistencial. Elas descrevem o conteúdo aprovado, mas não confirmam contratos específicos, clientes ou parceiros. Não foram incluídos nomes de instituições, marcas ou novas frentes assistenciais sem confirmação e autorização.

O menu usa “Nossos valores”. A pergunta da FAQ sobre instituições atendidas e a respectiva resposta permanecem ocultas até autorização expressa. O bloco de exemplos de instituições foi retirado. O rodapé continua removido conforme solicitado.

## Contato e dados

O telefone exibido é **(21) 98290-6043** e o botão do WhatsApp mantém o destino oficial configurado (DDI 55 + DDD 21). O e-mail oficial, a identificação legal do controlador e a área específica de atuação continuam pendentes de confirmação.

O formulário de contato envia os campos `name`, `email`, `phone`, `institution` e `message` por POST HTTPS para o Web3Forms. Nome, e-mail e mensagem são obrigatórios; telefone e instituição são opcionais. O assunto é “Novo contato — Interliga Saúde” e o e-mail informado é usado como Reply-To. A mensagem de sucesso ou erro é mostrada no formulário.

A Access Key do Web3Forms está incluída no arquivo público `assets/js/config.js` porque um site estático precisa disponibilizá-la ao navegador. O valor pode ser visto pelos visitantes; se sua conta/plano permitir, restrinja o uso ao domínio publicado no painel do Web3Forms. Não reutilize uma chave privada de outro serviço.

**Nenhum envio real para Gmail foi feito nesta alteração.** Depois de publicar, confirme no painel Web3Forms o destinatário associado à Access Key. Teste os dois formulários com dados fictícios, verifique a caixa de entrada e o Spam e confira o Reply-To respondendo ao e-mail recebido.

## Profissionais interessados

A seção “Área para profissionais interessados” envia nome completo, conselho profissional e número de registro, categoria profissional/especialidade, e-mail, telefone/WhatsApp, cidade/UF de atuação e períodos de disponibilidade ao Web3Forms por POST HTTPS; o CPF foi removido do contato inicial. A solicitação usa a Access Key pública configurada e é encaminhada ao endereço associado à chave. O site não mantém uma base própria de inscrições. Confirme o destinatário no painel Web3Forms; o aviso de privacidade continua preliminar.

O aviso em `privacy.html` é preliminar: identificação do controlador, contato de privacidade, bases e prazos ainda precisam de validação institucional. O contato e o link para o aviso permanecem disponíveis na página, sem restaurar o rodapé.

## Estrutura do pacote

- `index.html` — landing page e metadados.
- `privacy.html` — aviso preliminar de privacidade.
- `assets/css/style.css` — layout, identidade visual e regras responsivas, com fontes locais.
- `assets/js/script.js` — navegação, FAQ, formulários, validação e canais de contato.
- `assets/js/config.js` — telefone, destino do WhatsApp e configuração pública do Web3Forms.
- `assets/images/` — logotipo, banner, foto de “Quem somos” e imagem da seção de soluções.
- `assets/fonts/` — arquivos WOFF2 Inter/Manrope e licenças OFL.

Não inclua `node_modules`, caches, arquivos temporários ou arquivos do ambiente de desenvolvimento no repositório.

## Origem da imagem de reunião

Imagem obtida de [Doodle — The importance of setting agendas for meetings](https://doodle.com/pt_BR/the-importance-of-setting-agendas-for-meetings/). A página não exibe crédito visível; a origem fica documentada aqui.
