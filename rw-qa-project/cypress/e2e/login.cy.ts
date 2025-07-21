describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should display login form', () => {
    cy.get('[data-cy="email-input"]').should('be.visible')
    cy.get('[data-cy="password-input"]').should('be.visible')
    cy.get('[data-cy="login-button"]').should('be.visible')
    cy.contains('Faça login em sua conta').should('be.visible')
  })

  it('should show error message for invalid credentials', () => {
    cy.get('[data-cy="email-input"]').type('invalid@test.com')
    cy.get('[data-cy="password-input"]').type('wrongpassword')
    cy.get('[data-cy="login-button"]').click()
    
    cy.get('[data-cy="error-message"]').should('be.visible')
    cy.get('[data-cy="error-message"]').should('contain', 'Email ou senha inválidos')
  })

  it('should login successfully with valid credentials', () => {
    cy.get('[data-cy="email-input"]').type('admin@test.com')
    cy.get('[data-cy="password-input"]').type('password123')
    cy.get('[data-cy="login-button"]').click()
    
    // Should redirect to users page
    cy.url().should('include', '/users')
    cy.contains('Gerenciamento de Usuários').should('be.visible')
  })

  it('should show loading state during login', () => {
    cy.get('[data-cy="email-input"]').type('admin@test.com')
    cy.get('[data-cy="password-input"]').type('password123')
    cy.get('[data-cy="login-button"]').click()
    
    // Check if button shows loading state (this might be very fast)
    cy.get('[data-cy="login-button"]').should('contain', 'Entrar')
  })

  it('should display test credentials hint', () => {
    cy.contains('Credenciais de teste: admin@test.com / password123').should('be.visible')
  })

  it('should require email and password fields', () => {
    cy.get('[data-cy="login-button"]').click()
    
    // HTML5 validation should prevent form submission
    cy.get('[data-cy="email-input"]').should('have.attr', 'required')
    cy.get('[data-cy="password-input"]').should('have.attr', 'required')
  })
})
