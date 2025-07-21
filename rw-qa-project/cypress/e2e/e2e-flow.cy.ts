describe('Complete E2E Flow', () => {
  it('should complete full user journey: login → manage users → logout', () => {
    // 1. Start at home page and redirect to login
    cy.visit('/')
    cy.url().should('include', '/login')
    
    // 2. Login with valid credentials
    cy.get('[data-cy="email-input"]').type('admin@test.com')
    cy.get('[data-cy="password-input"]').type('password123')
    cy.get('[data-cy="login-button"]').click()
    
    // 3. Verify successful login and navigation to users page
    cy.url().should('include', '/users')
    cy.contains('Gerenciamento de Usuários').should('be.visible')
    
    // 4. Add a new user
    cy.get('[data-cy="add-user-button"]').click()
    cy.get('[data-cy="user-name-input"]').type('Teste E2E')
    cy.get('[data-cy="user-email-input"]').type('e2e@test.com')
    cy.get('[data-cy="user-role-select"]').select('User')
    cy.get('[data-cy="save-user-button"]').click()
    
    // 5. Verify user was added
    cy.get('[data-cy="users-table"]').within(() => {
      cy.contains('Teste E2E').should('be.visible')
      cy.contains('e2e@test.com').should('be.visible')
    })
    
    // 6. Edit the user
    cy.get('[data-cy="users-table"]').within(() => {
      cy.contains('Teste E2E').parent().within(() => {
        cy.get('button').contains('Editar').click()
      })
    })
    
    cy.get('[data-cy="user-name-input"]').clear().type('Teste E2E Editado')
    cy.get('[data-cy="user-role-select"]').select('Admin')
    cy.get('[data-cy="save-user-button"]').click()
    
    // 7. Verify user was edited
    cy.get('[data-cy="users-table"]').within(() => {
      cy.contains('Teste E2E Editado').should('be.visible')
      cy.contains('Admin').should('be.visible')
    })
    
    // 8. Delete the user
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(true)
    })
    
    cy.get('[data-cy="users-table"]').within(() => {
      cy.contains('Teste E2E Editado').parent().within(() => {
        cy.get('button').contains('Excluir').click()
      })
    })
    
    // 9. Verify user was deleted
    cy.get('[data-cy="users-table"]').within(() => {
      cy.contains('Teste E2E Editado').should('not.exist')
    })
    
    // 10. Logout
    cy.get('[data-cy="logout-button"]').click()
    
    // 11. Verify logout successful
    cy.url().should('include', '/login')
    cy.contains('Faça login em sua conta').should('be.visible')
  })

  it('should handle authentication flow correctly', () => {
    // 1. Try to access protected page without login
    cy.visit('/users')
    
    // 2. Should redirect to login
    cy.url().should('include', '/login')
    
    // 3. Login and access protected page
    cy.get('[data-cy="email-input"]').type('admin@test.com')
    cy.get('[data-cy="password-input"]').type('password123')
    cy.get('[data-cy="login-button"]').click()
    
    // 4. Should now be able to access users page
    cy.url().should('include', '/users')
    cy.contains('Gerenciamento de Usuários').should('be.visible')
  })
})
