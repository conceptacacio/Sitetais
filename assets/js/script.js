(function () {
  'use strict';

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  }

  onReady(function () {
    var rawConfig = window.INTERLIGA_CONFIG;
    var sourceConfig = rawConfig && typeof rawConfig === 'object' ? rawConfig : {};
    var config = {
      whatsapp: typeof sourceConfig.whatsapp === 'string' ? sourceConfig.whatsapp.trim() : '',
      email: typeof sourceConfig.email === 'string' ? sourceConfig.email.trim() : '',
      phone: typeof sourceConfig.phone === 'string' ? sourceConfig.phone.trim() : '',
      address: typeof sourceConfig.address === 'string' ? sourceConfig.address.trim() : '',
      publicOrigin: typeof sourceConfig.publicOrigin === 'string' ? sourceConfig.publicOrigin.trim() : '',
      institutionDescription: typeof sourceConfig.institutionDescription === 'string' ? sourceConfig.institutionDescription.trim() : '',
      solutions: Array.isArray(sourceConfig.solutions) ? sourceConfig.solutions : []
    };

    var menuToggle = document.getElementById('menu-toggle');
    var siteNav = document.getElementById('site-nav');
    var channelStatus = document.getElementById('channel-status');
    var form = document.getElementById('contact-form');
    var formStatus = document.getElementById('form-status');
    var fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      phone: document.getElementById('phone'),
      organization: document.getElementById('organization'),
      message: document.getElementById('message'),
      consent: document.getElementById('consent'),
      website: document.getElementById('website')
    };
    var associationForm = document.getElementById('association-form');
    var associationFormStatus = document.getElementById('association-form-status');
    var associationFields = {
      fullName: document.getElementById('assoc-name'),
      cpf: document.getElementById('assoc-cpf'),
      crmUf: document.getElementById('assoc-crm'),
      specialty: document.getElementById('assoc-specialty'),
      email: document.getElementById('assoc-email'),
      phone: document.getElementById('assoc-phone'),
      cityUf: document.getElementById('assoc-city'),
      availability: document.getElementById('assoc-availability')
    };

    var fieldMessages = {
      name: 'Informe seu nome com pelo menos 2 caracteres.',
      email: 'Informe um e-mail válido.',
      phone: 'Informe um telefone brasileiro válido ou deixe o campo em branco.',
      organization: 'A instituição deve ter no máximo 150 caracteres.',
      message: 'Escreva uma mensagem entre 10 e 2.000 caracteres.',
      consent: 'É necessário concordar com o aviso de privacidade.'
    };

    function hasText(value) {
      return typeof value === 'string' && value.trim().length > 0;
    }

    function getErrorElement(field) {
      return field ? document.getElementById(field.id + '-error') : null;
    }

    function setFieldError(field, message) {
      if (!field) {
        return;
      }
      if (typeof field.setCustomValidity === 'function') {
        field.setCustomValidity(message || '');
      }
      var errorElement = getErrorElement(field);
      if (errorElement) {
        errorElement.textContent = message || '';
      }
      if (message) {
        field.setAttribute('aria-invalid', 'true');
      } else {
        field.removeAttribute('aria-invalid');
      }
    }

    function clearFieldError(field) {
      setFieldError(field, '');
    }

    function setStatus(element, message) {
      if (!element) {
        return;
      }
      element.textContent = message || '';
      if (message) {
        element.hidden = false;
      }
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    }

    function brazilianPhoneDigits(value) {
      var digits = String(value || '').replace(/\D/g, '');
      if ((digits.length === 12 || digits.length === 13) && digits.indexOf('55') === 0) {
        return digits.slice(2);
      }
      return digits;
    }

    function isValidBrazilianPhone(value) {
      if (!hasText(value)) {
        return true;
      }
      if (!/^[\d\s()+.-]+$/.test(String(value))) {
        return false;
      }
      var digits = brazilianPhoneDigits(value);
      if (digits.length !== 10 && digits.length !== 11) {
        return false;
      }
      var areaCode = Number(digits.slice(0, 2));
      return areaCode >= 11 && areaCode <= 99;
    }

    function isValidWhatsApp(value) {
      return /^55[1-9]\d{9,10}$/.test(value);
    }

    function validateForm() {
      var invalidFields = [];
      var requiredElementMissing = !fields.name || !fields.email || !fields.message || !fields.consent;
      var name = fields.name ? fields.name.value.trim() : '';
      var email = fields.email ? fields.email.value.trim() : '';
      var phone = fields.phone ? fields.phone.value.trim() : '';
      var organization = fields.organization ? fields.organization.value.trim() : '';
      var message = fields.message ? fields.message.value.trim() : '';
      var consentGiven = Boolean(fields.consent && fields.consent.checked);
      var honeypotFilled = Boolean(fields.website && fields.website.value.trim());

      if (!fields.name || name.length < 2 || name.length > 100) {
        setFieldError(fields.name, fieldMessages.name);
        if (fields.name) {
          invalidFields.push(fields.name);
        }
      } else {
        clearFieldError(fields.name);
      }

      if (!fields.email || !isValidEmail(email) || email.length > 254) {
        setFieldError(fields.email, fieldMessages.email);
        if (fields.email) {
          invalidFields.push(fields.email);
        }
      } else {
        clearFieldError(fields.email);
      }

      if (!isValidBrazilianPhone(phone) || phone.length > 22) {
        setFieldError(fields.phone, fieldMessages.phone);
        if (fields.phone) {
          invalidFields.push(fields.phone);
        }
      } else {
        clearFieldError(fields.phone);
      }

      if (organization.length > 150) {
        setFieldError(fields.organization, fieldMessages.organization);
        if (fields.organization) {
          invalidFields.push(fields.organization);
        }
      } else {
        clearFieldError(fields.organization);
      }

      if (!fields.message || message.length < 10 || message.length > 2000) {
        setFieldError(fields.message, fieldMessages.message);
        if (fields.message) {
          invalidFields.push(fields.message);
        }
      } else {
        clearFieldError(fields.message);
      }

      if (!consentGiven) {
        setFieldError(fields.consent, fieldMessages.consent);
        if (fields.consent) {
          invalidFields.push(fields.consent);
        }
      } else {
        clearFieldError(fields.consent);
      }

      return {
        valid: invalidFields.length === 0 && !honeypotFilled && !requiredElementMissing,
        invalidFields: invalidFields,
        honeypotFilled: honeypotFilled,
        values: {
          name: name,
          email: email,
          phone: phone,
          organization: organization,
          message: message
        }
      };
    }

    function composeMessage(values) {
      return [
        'Olá, Interliga Saúde.',
        '',
        'Nome: ' + values.name,
        'E-mail: ' + values.email,
        'Telefone: ' + (values.phone || 'Não informado'),
        'Instituição: ' + (values.organization || 'Não informada'),
        '',
        'Mensagem:',
        values.message
      ].join('\n');
    }

    function requestNewTab(url) {
      try {
        return window.open(url, '_blank', 'noopener,noreferrer');
      } catch (error) {
        return null;
      }
    }

    function announceChannel(message) {
      if (!channelStatus) {
        return;
      }
      channelStatus.hidden = false;
      channelStatus.textContent = message;
    }

    function openWhatsApp(messageText) {
      var url = 'https://wa.me/' + config.whatsapp;
      if (messageText) {
        url += '?text=' + encodeURIComponent(messageText);
      }
      var opened = requestNewTab(url);
      if (opened === null) {
        announceChannel('Não foi possível abrir o WhatsApp automaticamente. Use o número oficial configurado para continuar.');
      }
      return opened;
    }

    function openEmail(messageText) {
      var subject = encodeURIComponent('Contato pelo site Interliga Saúde');
      var body = encodeURIComponent(messageText);
      var url = 'mailto:' + config.email + '?subject=' + subject + '&body=' + body;
      return requestNewTab(url);
    }

    function prepareContactMessage(values) {
      var messageText = composeMessage(values);
      if (isValidWhatsApp(config.whatsapp)) {
        if (openWhatsApp(messageText) === null) {
          setStatus(formStatus, 'O navegador bloqueou a abertura do WhatsApp. Nenhuma mensagem foi enviada.');
        } else {
          setStatus(formStatus, 'Mensagem preparada para o WhatsApp. Revise o conteúdo e clique em Enviar no WhatsApp; nada foi enviado automaticamente.');
        }
        return;
      }
      if (isValidEmail(config.email)) {
        if (openEmail(messageText) === null) {
          setStatus(formStatus, 'O navegador bloqueou a abertura do aplicativo de e-mail. Nenhuma mensagem foi enviada.');
        } else {
          setStatus(formStatus, 'Mensagem preparada para o aplicativo de e-mail. Revise e envie por lá; nada foi enviado automaticamente.');
        }
        return;
      }
      setStatus(formStatus, 'Integração pendente. Nenhuma mensagem foi enviada.');
    }

    function closeMenu(restoreFocus) {
      if (!menuToggle || !siteNav) {
        return;
      }
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
      siteNav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      if (restoreFocus) {
        menuToggle.focus({ preventScroll: true });
      }
    }

    function openMenu() {
      if (!menuToggle || !siteNav) {
        return;
      }
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Fechar menu de navegação');
      siteNav.classList.add('is-open');
      document.body.classList.add('menu-open');
      var firstLink = siteNav.querySelector('a[href]');
      if (firstLink) {
        firstLink.focus({ preventScroll: true });
      }
    }

    function setupMenu() {
      if (!menuToggle || !siteNav) {
        return;
      }
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.addEventListener('click', function () {
        if (menuToggle.getAttribute('aria-expanded') === 'true') {
          closeMenu(true);
        } else {
          openMenu();
        }
      });
      siteNav.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function () {
          closeMenu(false);
        });
      });
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
          event.preventDefault();
          closeMenu(true);
        }
      });
    }

    function updateContactDetails() {
      var details = [
        ['contact-email', config.email],
        ['contact-phone', config.phone],
        ['contact-address', config.address]
      ];
      details.forEach(function (item) {
        var element = document.getElementById(item[0]);
        if (element && hasText(item[1])) {
          element.textContent = item[1];
        }
      });
      var description = document.getElementById('institution-description');
      if (description && hasText(config.institutionDescription)) {
        description.textContent = config.institutionDescription;
      }
    }

    function createIcon(symbolId) {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'icon');
      svg.setAttribute('aria-hidden', 'true');
      var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttribute('href', symbolId);
      svg.appendChild(use);
      return svg;
    }

    function createSolutionCard(solution, index) {
      var article = document.createElement('article');
      article.className = 'solution-card';

      var top = document.createElement('div');
      top.className = 'card-top';
      var iconBox = document.createElement('div');
      iconBox.className = 'icon-box';
      var symbolIds = ['#icon-heart', '#icon-users', '#icon-link'];
      iconBox.appendChild(createIcon(symbolIds[index % symbolIds.length]));
      var number = document.createElement('span');
      number.className = 'card-number';
      number.textContent = String(index + 1).padStart(2, '0');
      top.appendChild(iconBox);
      top.appendChild(number);

      var title = document.createElement('h3');
      title.textContent = solution.title.trim();
      var description = document.createElement('p');
      description.textContent = solution.description.trim();
      var link = document.createElement('a');
      link.className = 'card-link';
      link.href = '#contato';
      link.textContent = 'Conversar sobre esta solução ';
      link.appendChild(createIcon('#icon-arrow'));

      article.appendChild(top);
      article.appendChild(title);
      article.appendChild(description);
      article.appendChild(link);
      return article;
    }

    function renderConfirmedSolutions() {
      var list = document.getElementById('solutions-list');
      if (!list) {
        return;
      }
      var confirmedSolutions = config.solutions.filter(function (solution) {
        return solution && typeof solution === 'object' && hasText(solution.title) && hasText(solution.description);
      });
      if (confirmedSolutions.length === 0) {
        return;
      }
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      confirmedSolutions.forEach(function (solution, index) {
        list.appendChild(createSolutionCard(solution, index));
      });
      list.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function () {
          closeMenu(false);
        });
      });
    }

    function setupWhatsAppButtons() {
      var buttons = [
        document.getElementById('whatsapp-contact'),
        document.getElementById('whatsapp-floating')
      ].filter(Boolean);
      buttons.forEach(function (button) {
        button.addEventListener('click', function () {
          if (!isValidWhatsApp(config.whatsapp)) {
            announceChannel('Número oficial ainda não configurado.');
            return;
          }
          if (openWhatsApp('') !== null) {
            announceChannel('WhatsApp aberto em uma nova aba. Revise a conversa e envie quando estiver pronto.');
          }
        });
      });
    }

    function setupFloatingContact() {
      var floatingButton = document.getElementById('whatsapp-floating');
      if (!floatingButton) {
        return;
      }
      var updateVisibility = function () {
        document.body.classList.toggle('has-scrolled', window.scrollY > 180);
      };
      updateVisibility();
      window.addEventListener('scroll', updateVisibility, { passive: true });
    }

    function setupForm() {
      if (!form) {
        return;
      }
      ['name', 'email', 'phone', 'organization', 'message'].forEach(function (key) {
        if (fields[key]) {
          fields[key].addEventListener('input', function () {
            clearFieldError(fields[key]);
          });
        }
      });
      if (fields.consent) {
        fields.consent.addEventListener('change', function () {
          clearFieldError(fields.consent);
        });
      }
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var validation = validateForm();
        if (!validation.valid) {
          if (validation.honeypotFilled) {
            setStatus(formStatus, 'Não foi possível preparar a mensagem. Nenhuma mensagem foi enviada.');
          } else {
            setStatus(formStatus, 'Revise os campos destacados antes de preparar a mensagem.');
          }
          if (validation.invalidFields.length > 0) {
            validation.invalidFields[0].focus({ preventScroll: false });
          }
          return;
        }
        prepareContactMessage(validation.values);
      });
    }

    function isValidCpf(value) {
      var digits = String(value || '').replace(/\D/g, '');
      if (!/^\d{11}$/.test(digits) || /^(\d)\1{10}$/.test(digits)) {
        return false;
      }
      var sum = 0;
      var index;
      for (index = 0; index < 9; index += 1) {
        sum += Number(digits.charAt(index)) * (10 - index);
      }
      var firstCheck = (sum * 10) % 11;
      if (firstCheck === 10) {
        firstCheck = 0;
      }
      if (firstCheck !== Number(digits.charAt(9))) {
        return false;
      }
      sum = 0;
      for (index = 0; index < 10; index += 1) {
        sum += Number(digits.charAt(index)) * (11 - index);
      }
      var secondCheck = (sum * 10) % 11;
      if (secondCheck === 10) {
        secondCheck = 0;
      }
      return secondCheck === Number(digits.charAt(10));
    }

    function isValidCrmUf(value) {
      var uf = '(?:AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)';
      var normalized = String(value || '').trim().toUpperCase().replace(/\s+/g, ' ');
      var prefixPattern = new RegExp('^(?:CRM\\s*[-/]?\\s*)?' + uf + '\\s*[-/]?\\s*\\d{1,8}$');
      var suffixPattern = new RegExp('^\\d{1,8}\\s*[-/]?\\s*' + uf + '$');
      return prefixPattern.test(normalized) || suffixPattern.test(normalized);
    }

    function isValidCityUf(value) {
      var uf = '(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)';
      var match = String(value || '').trim().match(new RegExp('^(.{2,})[,\\s/-]+' + uf + '$', 'i'));
      return Boolean(match && match[1].trim().length >= 2);
    }

    function isValidAssociationPhone(value) {
      var digits = String(value || '').replace(/\D/g, '');
      if (digits.indexOf('55') === 0 && (digits.length === 12 || digits.length === 13)) {
        digits = digits.slice(2);
      }
      return /^\d{10,11}$/.test(digits);
    }

    function validateAssociationForm() {
      var invalidFields = [];
      function validateField(key, isValid, message) {
        var field = associationFields[key];
        if (!field) {
          return;
        }
        if (isValid) {
          setFieldError(field, '');
          return;
        }
        setFieldError(field, message);
        invalidFields.push(field);
      }

      var fullName = associationFields.fullName ? associationFields.fullName.value.trim() : '';
      var cpf = associationFields.cpf ? associationFields.cpf.value : '';
      var crmUf = associationFields.crmUf ? associationFields.crmUf.value : '';
      var specialty = associationFields.specialty ? associationFields.specialty.value.trim() : '';
      var email = associationFields.email ? associationFields.email.value.trim() : '';
      var phone = associationFields.phone ? associationFields.phone.value : '';
      var cityUf = associationFields.cityUf ? associationFields.cityUf.value : '';
      var availability = associationFields.availability ? associationFields.availability.value.trim() : '';

      validateField('fullName', fullName.length >= 3, 'Informe seu nome completo.');
      validateField('cpf', isValidCpf(cpf), 'Informe um CPF válido com 11 dígitos e verificadores corretos.');
      validateField('crmUf', isValidCrmUf(crmUf), 'Informe o registro no formato CRM-UF e número, por exemplo CRM-SP 123456.');
      validateField('specialty', specialty.length >= 2, 'Informe sua especialidade médica.');
      validateField('email', isValidEmail(email), 'Informe um e-mail válido.');
      validateField('phone', isValidAssociationPhone(phone), 'Informe um telefone/WhatsApp brasileiro válido.');
      validateField('cityUf', isValidCityUf(cityUf), 'Informe a cidade e a UF, por exemplo Campinas/SP.');
      validateField('availability', availability.length >= 4, 'Descreva seus períodos de disponibilidade.');

      if (invalidFields.length > 0) {
        setStatus(associationFormStatus, 'Revise os campos destacados. Nenhum dado foi enviado ou armazenado.');
        if (invalidFields[0] && typeof invalidFields[0].focus === 'function') {
          invalidFields[0].focus({ preventScroll: false });
        }
        return false;
      }

      setStatus(associationFormStatus, 'Os campos parecem válidos segundo a checagem local. Esta página não envia nem conclui o cadastro e não armazenou dados. Use apenas dados fictícios enquanto não houver um canal seguro.');
      return true;
    }

    function setupAssociationForm() {
      if (!associationForm) {
        return;
      }
      Object.keys(associationFields).forEach(function (key) {
        var field = associationFields[key];
        if (!field) {
          return;
        }
        field.addEventListener('input', function () {
          clearFieldError(field);
          if (associationFormStatus) {
            associationFormStatus.textContent = '';
          }
        });
      });
      associationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        validateAssociationForm();
      });
    }

    function setupFaq() {
      var faqDetails = document.querySelectorAll('.faq-items details');
      faqDetails.forEach(function (detail) {
        var summary = detail.querySelector('summary');
        if (!summary) {
          return;
        }
        summary.addEventListener('click', function () {
          if (!detail.open) {
            faqDetails.forEach(function (otherDetail) {
              if (otherDetail !== detail) {
                otherDetail.open = false;
              }
            });
          }
        });
      });
    }

    function updateYear() {
      var yearElement = document.getElementById('current-year');
      if (yearElement) {
        yearElement.textContent = String(new Date().getFullYear());
      }
    }

    setupMenu();
    updateContactDetails();
    renderConfirmedSolutions();
    setupWhatsAppButtons();
    setupFloatingContact();
    setupForm();
    setupAssociationForm();
    setupFaq();
    updateYear();
  });
}());
