// ir para o site
describe('redirecionamento para o website',()=>{
   beforeEach(() => {
        cy.visit('/login');
    })

    it('Deve redirecionar ao website',()=>{
    cy.visit('/login');
    cy.url().should('include', '/login');
   }) 

   it('fazer login e criar novo utilizador',()=>{
    //Email
    cy.get('[data-cy="email-input"]').should('be.visible');
    cy.get('[data-cy="email-input"]').type('admin@test.com');

    //Password
    cy.get('[data-cy="password-input"]').should('be.visible');
    cy.get('[data-cy="password-input"]').type('password123');

    //clicar no botão Entrar
    cy.get('[data-cy="login-button"]').click();

    //Adicionar novo usuário 
    cy.get('[data-cy="add-user-button"]').click();

    //nome
    cy.get('[data-cy="user-name-input"]').should('be.visible');
    cy.get('[data-cy="user-name-input"]').type('Pedro Fonseca');
    
    //email
    cy.get('[data-cy="user-email-input"]').should('be.visible');
    cy.get('[data-cy="user-email-input"]').type('pedroqa@teste.com');

    //função
    cy.get('[data-cy="user-role-select"]').select('Admin');

    //botão adicionar
    cy.get('[data-cy="save-user-button"]').click();

    //exluir usuario
    cy.contains('Pedro Fonseca').parent().contains('Excluir').click();

    //logout
    cy.get('[data-cy="logout-button"]').click();

   })
})
//fazer login com o usuario
//verificar se deu certo mudar de pagina
//criar um novo usuario
//verificar se o usuario foi criado
//verificar se o usuario foi deletado