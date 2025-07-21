// cypress/support/commands.ts

// Custom commands for the application

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>
      logout(): Chainable<void>
    }
  }
}

// Login command
Cypress.Commands.add('login', (email = 'admin@test.com', password = 'password123') => {
  cy.visit('/login')
  cy.get('[data-cy="email-input"]').type(email)
  cy.get('[data-cy="password-input"]').type(password)
  cy.get('[data-cy="login-button"]').click()
})

// Logout command
Cypress.Commands.add('logout', () => {
  cy.get('[data-cy="logout-button"]').click()
})
