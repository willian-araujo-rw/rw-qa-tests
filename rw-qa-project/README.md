# RW QA Project - Next.js com Cypress E2E Tests

Este é um projeto de demonstração que implementa uma aplicação web simples com Next.js e testes end-to-end usando Cypress.

## 🚀 Funcionalidades

- **Página de Login**: Autenticação simples com credenciais pré-definidas
- **CRUD de Usuários**: Interface completa para gerenciar usuários (Create, Read, Update, Delete)
- **Autenticação**: Controle de acesso às páginas protegidas
- **Testes E2E**: Cobertura completa de testes com Cypress

## 📋 Pré-requisitos

- Node.js 18+ 
- npm

## 🛠️ Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`

### Produção
```bash
npm run build
npm start
```

## 🧪 Executando os Testes

### Abrir Cypress (Modo Interativo)
```bash
npm run cypress:open
```

### Executar Testes em Background
```bash
npm run cypress:run
```

### Executar Testes com Interface
```bash
npm run cypress:run:headed
```

### Executar Testes E2E Completos (inicia servidor + testes)
```bash
npm run test:e2e
```

### Executar Testes E2E Interativo (inicia servidor + abre Cypress)
```bash
npm run test:e2e:open
```

## 🔐 Credenciais de Teste

Para acessar a aplicação, use:
- **Email**: `admin@test.com`
- **Senha**: `password123`

## 📁 Estrutura do Projeto

```
rw-qa-project/
├── src/
│   └── app/
│       ├── login/          # Página de login
│       ├── users/          # Página de CRUD de usuários
│       ├── page.tsx        # Página inicial (redireciona para login)
│       └── layout.tsx      # Layout principal
├── cypress/
│   ├── e2e/               # Testes end-to-end
│   │   ├── login.cy.ts    # Testes de login
│   │   ├── users-crud.cy.ts # Testes de CRUD
│   │   └── e2e-flow.cy.ts # Testes de fluxo completo
│   └── support/           # Configurações e comandos customizados
├── cypress.config.ts      # Configuração do Cypress
└── package.json
```

## 🧪 Casos de Teste Cobertos

### Login (`cypress/e2e/login.cy.ts`)
- ✅ Exibição do formulário de login
- ✅ Validação de credenciais inválidas
- ✅ Login com credenciais válidas
- ✅ Estado de carregamento
- ✅ Validação de campos obrigatórios

### CRUD de Usuários (`cypress/e2e/users-crud.cy.ts`)
- ✅ Exibição da página de usuários
- ✅ Listagem de usuários existentes
- ✅ Adição de novos usuários
- ✅ Edição de usuários existentes
- ✅ Exclusão de usuários
- ✅ Validação de formulários
- ✅ Funcionalidade de logout

### Fluxo Completo (`cypress/e2e/e2e-flow.cy.ts`)
- ✅ Jornada completa do usuário
- ✅ Controle de autenticação
- ✅ Redirecionamentos apropriados

## 🎯 Data Attributes para Testes

O projeto utiliza atributos `data-cy` para facilitar a seleção de elementos nos testes:

```html
<!-- Exemplos -->
<input data-cy="email-input" />
<button data-cy="login-button">Entrar</button>
<table data-cy="users-table">...</table>
```

## 🛡️ Recursos de Segurança

- Validação de autenticação em páginas protegidas
- Redirecionamento automático para login quando não autenticado
- Limpeza de estado ao fazer logout

## 🎨 Tecnologias Utilizadas

- **Next.js 15** - Framework React para produção
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Cypress** - Framework de testes E2E
- **React Hooks** - Gerenciamento de estado

## 📝 Notas de Desenvolvimento

- O projeto usa `localStorage` para simular autenticação (apenas para demonstração)
- Os dados de usuários são mantidos em estado local (não persistem entre sessões)
- Tratamento de erros e validações básicas implementadas
- Interface responsiva com Tailwind CSS

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é apenas para fins educacionais e demonstração.
