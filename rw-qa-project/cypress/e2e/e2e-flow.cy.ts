describe('Logando, criando e apagando', () => {
    beforeEach(() => {
        cy.visit('/login');
    })

    it('Teste de tudo', () => {
        // Email
        cy.get('#email').should('be.visible');
        cy.get('#email').type('admin@test.com');

        // Senha
        cy.get('#password').should('be.visible');
        cy.get('#password').type('password123');

        // Clica pra entrar
        cy.contains('Entrar').click();

        // Adiciona usuario
        cy.contains('Adicionar Usuário', { timeout: 10000 }).click();
        cy.url().should('include', '/users');

        cy.get('[data-cy="user-name-input"]', { timeout: 5000 });
        cy.get('[data-cy="user-name-input"]').type('Fernando Vasconcelos');
        cy.get('[data-cy="user-email-input"]').type('fernandao@gmail.com');

        cy.get('[data-cy="user-role-select"]').select('Admin');

        cy.get('[data-cy="save-user-button"]').click();

        // Apaga
        cy.contains('Fernando Vasconcelos', { timeout: 10000 }).parent().contains('Excluir').click();

        // Sai da conta
        cy.get('[data-cy="logout-button"]').click();
    })
})