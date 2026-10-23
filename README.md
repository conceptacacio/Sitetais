# Interliga Saúde — pacote para GitHub Pages

Este diretório contém a landing page estática pronta para publicação. Em “Nossas soluções”, a imagem de reunião da Doodle fica à esquerda e as descrições ficam à direita; a origem permanece registrada neste README. As descrições de serviço foram adaptadas da referência PRC e precisam ser confirmadas pela Interliga. O formulário de contato envia diretamente ao Web3Forms; o site não mantém backend ou base própria de leads.

## Publicar

1. Crie um repositório no GitHub ou abra um repositório existente.
2. Envie **o conteúdo inteiro deste diretório** para a raiz do repositório, mantendo a estrutura `assets/` e os arquivos `index.html` e `privacy.html` no nível principal.
3. No GitHub, abra **Settings → Pages**. Em **Build and deployment**, selecione **Deploy from a branch**, escolha a branch `main` (ou a branch usada pelo repositório) e a pasta **/(root)**; salve.
4. Aguarde o GitHub Pages concluir a implantação e abra o endereço mostrado nas configurações de Pages.

Os caminhos são relativos. Portanto, os mesmos arquivos funcionam na raiz de um domínio de usuário/organização e em um site de projeto, como `usuario.github.io/nome-do-repositorio/`.

## Dados oficiais pendentes

O telefone oficial informado é `021 98290-6043`, e o WhatsApp correspondente está configurado em `assets/js/config.js` como `5521982906043` (DDI 55 + DDD 21 + número). Antes de divulgar o site, confirme o e-mail, o endereço/região, a apresentação institucional e as soluções; revise os campos pendentes e valide o aviso de privacidade. Não acrescente dados de contato ou de clientes sem confirmação e autorização.

O formulário de contato envia por POST HTTPS ao Web3Forms os campos `name`, `email`, `phone`, `institution` e `message`; Nome, E-mail e Mensagem são obrigatórios, e Telefone e Instituição são opcionais. O assunto é “Novo contato — Interliga Saúde”, com o e-mail da pessoa como Reply-To. A Access Key está em `assets/js/config.js`; o Web3Forms a define como pública para uso no navegador, então ela ficará visível no site publicado. Não coloque senhas ou chaves privadas nesse arquivo. Se disponível no plano, restrinja o domínio autorizado a `conceptacacio.github.io`. A página não mantém cópia própria das mensagens; veja `privacy.html`.

O formulário “Quero me associar” inclui Nome completo, CPF, CRM/UF, Especialidade médica, E-mail, Telefone/WhatsApp, Cidade/UF de atuação e Períodos de Disponibilidade. Ele valida os campos somente no navegador, mas não envia, salva ou conclui o cadastro. Use apenas dados fictícios até que a empresa configure um canal seguro e valide o aviso de privacidade.

**Segurança da Access Key:** por ser um site estático, o navegador precisa receber a chave para chamar o Web3Forms; portanto, ela fica visível nos arquivos JavaScript publicados. O Web3Forms trata a Access Key como pública. Se a opção estiver disponível na sua conta/plano, restrinja o uso ao domínio publicado; não reutilize aqui uma chave privada de outro serviço.

## Teste real do formulário

Após publicar no GitHub Pages, confirme no painel Web3Forms que a Access Key está vinculada ao Gmail desejado. No site, envie uma mensagem de teste com seu nome, seu próprio e-mail, telefone/instituição opcionais e texto sem dados sensíveis. Aguarde a mensagem de sucesso e verifique a caixa de entrada e o Spam do Gmail de destino. Responda para confirmar o Reply-To. Esta entrega não executou um envio real.

## Estrutura

- `index.html` — landing page e metadados.
- `privacy.html` — aviso preliminar de privacidade.
- `assets/css/style.css` — identidade visual, layout responsivo e animações.
- `assets/js/script.js` — menu, FAQ, validação do formulário e canais de contato.
- `assets/js/config.js` — dados institucionais configuráveis.
- `assets/images/` — banner fornecido, logotipo, foto `conectar.jpg` (mantida sem reprocessamento) e `doodle-group-meeting.webp`, exibida à esquerda em “Nossas soluções”; a origem e o link para Doodle estão documentados neste README.
- `assets/fonts/` — fontes WOFF2 locais e respectivas licenças OFL.

Não envie `node_modules`, caches, arquivos temporários ou arquivos-fonte do ambiente de desenvolvimento; eles não fazem parte deste pacote.


## Fonte da imagem de reunião

Imagem obtida de [Doodle — The importance of setting agendas for meetings](https://doodle.com/pt_BR/the-importance-of-setting-agendas-for-meetings/). A página não exibe legenda de crédito.
