# Interliga Saúde — pacote para GitHub Pages

Este diretório contém a landing page estática pronta para publicação. O desenho, as cores, os textos e as funcionalidades foram preservados; o HTML, CSS e JavaScript estão organizados em arquivos separados, e as imagens e as fontes Inter/Manrope estão incluídas localmente. Não há etapa de compilação, bibliotecas externas, backend ou dependência do Manus.

## Publicar

1. Crie um repositório no GitHub ou abra um repositório existente.
2. Envie **o conteúdo inteiro deste diretório** para a raiz do repositório, mantendo a estrutura `assets/` e os arquivos `index.html` e `privacy.html` no nível principal.
3. No GitHub, abra **Settings → Pages**. Em **Build and deployment**, selecione **Deploy from a branch**, escolha a branch `main` (ou a branch usada pelo repositório) e a pasta **/(root)**; salve.
4. Aguarde o GitHub Pages concluir a implantação e abra o endereço mostrado nas configurações de Pages.

Os caminhos são relativos. Portanto, os mesmos arquivos funcionam na raiz de um domínio de usuário/organização e em um site de projeto, como `usuario.github.io/nome-do-repositorio/`.

## Dados oficiais pendentes

Antes de divulgar o site, preencha os dados confirmados pela empresa no arquivo `assets/js/config.js`: número internacional do WhatsApp (somente dígitos), e-mail, telefone, endereço/região, apresentação institucional e soluções. Revise os campos pendentes no HTML e valide o aviso de privacidade. Não acrescente dados de contato ou de clientes sem confirmação e autorização.

O formulário valida os campos no navegador. Depois de configurar um WhatsApp ou e-mail válido, ele prepara a mensagem no aplicativo correspondente para a pessoa revisar e enviar. Não há backend, armazenamento de leads nem envio automático nesta versão. O botão do WhatsApp usa o canal oficial somente depois da configuração.

## Estrutura

- `index.html` — landing page e metadados.
- `privacy.html` — aviso preliminar de privacidade.
- `assets/css/style.css` — identidade visual, layout responsivo e animações.
- `assets/js/script.js` — menu, FAQ, validação do formulário e canais de contato.
- `assets/js/config.js` — dados institucionais configuráveis.
- `assets/images/banner-interliga-saude.webp` — banner fornecido, convertido para WebP sem redimensionar ou recortar (1774 × 887); `interliga-logo.webp` — logotipo.
- `assets/fonts/` — fontes WOFF2 locais e respectivas licenças OFL.

Não envie `node_modules`, caches, arquivos temporários ou arquivos-fonte do ambiente de desenvolvimento; eles não fazem parte deste pacote.
