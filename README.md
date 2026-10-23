# Interliga Saúde — pacote para GitHub Pages

Este diretório contém a landing page estática pronta para publicação. Em “Nossas soluções”, a imagem de reunião da Doodle fica à esquerda e as descrições ficam à direita; a página não exibe rótulo de crédito, mas a origem e o link permanecem registrados neste README. As descrições de serviço foram adaptadas da referência PRC e precisam ser confirmadas pela Interliga antes da divulgação. O HTML, CSS, JavaScript, imagens e fontes Inter/Manrope estão no pacote; não há compilação, backend ou dependência do Manus.

## Publicar

1. Crie um repositório no GitHub ou abra um repositório existente.
2. Envie **o conteúdo inteiro deste diretório** para a raiz do repositório, mantendo a estrutura `assets/` e os arquivos `index.html` e `privacy.html` no nível principal.
3. No GitHub, abra **Settings → Pages**. Em **Build and deployment**, selecione **Deploy from a branch**, escolha a branch `main` (ou a branch usada pelo repositório) e a pasta **/(root)**; salve.
4. Aguarde o GitHub Pages concluir a implantação e abra o endereço mostrado nas configurações de Pages.

Os caminhos são relativos. Portanto, os mesmos arquivos funcionam na raiz de um domínio de usuário/organização e em um site de projeto, como `usuario.github.io/nome-do-repositorio/`.

## Dados oficiais pendentes

O telefone oficial informado é `021 98290-6043`, e o WhatsApp correspondente está configurado em `assets/js/config.js` como `5521982906043` (DDI 55 + DDD 21 + número). Antes de divulgar o site, confirme o e-mail, o endereço/região, a apresentação institucional e as soluções; revise os campos pendentes e valide o aviso de privacidade. Não acrescente dados de contato ou de clientes sem confirmação e autorização.

O formulário valida os campos no navegador. Depois de configurar um WhatsApp ou e-mail válido, ele prepara a mensagem no aplicativo correspondente para a pessoa revisar e enviar. Não há backend, armazenamento de leads nem envio automático nesta versão.

O formulário “Quero me associar” inclui Nome completo, CPF, CRM/UF, Especialidade médica, E-mail, Telefone/WhatsApp, Cidade/UF de atuação e Períodos de Disponibilidade. Ele valida os campos somente no navegador, mas não envia, salva ou conclui o cadastro. Use apenas dados fictícios até que a empresa configure um canal seguro e valide o aviso de privacidade.

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
