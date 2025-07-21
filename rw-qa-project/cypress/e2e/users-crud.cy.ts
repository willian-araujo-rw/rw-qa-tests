describe('Users CRUD', () => {
  beforeEach(() => {
    // Login before each test
    cy.visit('/login')
    cy.get('[data-cy="email-input"]').type('admin@test.com')
    cy.get('[data-cy="password-input"]').type('password123')
    cy.get('[data-cy="login-button"]').click()
    cy.url().should('include', '/users')
  })

  it('should display users page correctly', () => {
    cy.contains('Gerenciamento de Usuários').should('be.visible')
    cy.get('[data-cy="add-user-button"]').should('be.visible')
    cy.get('[data-cy="logout-button"]').should('be.visible')
    cy.get('[data-cy="users-table"]').should('be.visible')
  })

  it('should display existing users in table', () => {
    // Check if initial users are displayed
    cy.get('[data-cy="users-table"]').within(() => {
      cy.contains('João Silva').should('be.visible')
      cy.contains('joao@test.com').should('be.visible')
      cy.contains('Maria Santos').should('be.visible')
      cy.contains('maria@test.com').should('be.visible')
      cy.contains('Pedro Oliveira').should('be.visible')
      cy.contains('pedro@test.com').should('be.visible')
    })
  })

  it('should open add user modal', () => {
    cy.get('[data-cy="add-user-button"]').click()
    cy.get('[data-cy="user-modal"]').should('be.visible')
    cy.contains('Adicionar Usuário').should('be.visible')
    cy.get('[data-cy="user-name-input"]').should('be.visible')
    cy.get('[data-cy="user-email-input"]').should('be.visible')
    cy.get('[data-cy="user-role-select"]').should('be.visible')
  })

  it('should add a new user', () => {
    cy.get('[data-cy="add-user-button"]').click()
    
    // Fill form
    cy.get('[data-cy="user-name-input"]').type('Novo Usuário')
    cy.get('[data-cy="user-email-input"]').type('novo@test.com')
    cy.get('[data-cy="user-role-select"]').select('Admin')
    
    // Save user
    cy.get('[data-cy="save-user-button"]').click()
    
    // Check if user was added to table
    cy.get('[data-cy="users-table"]').within(() => {
      cy.contains('Novo Usuário').should('be.visible')
      cy.contains('novo@test.com').should('be.visible')
      cy.contains('Admin').should('be.visible')
    })
  })

  it('should cancel adding user', () => {
    cy.get('[data-cy="add-user-button"]').click()
    cy.get('[data-cy="user-name-input"]').type('Test User')
    cy.get('[data-cy="cancel-button"]').click()
    
    // Modal should be closed
    cy.get('[data-cy="user-modal"]').should('not.exist')
    
    // User should not be added
    cy.get('[data-cy="users-table"]').within(() => {
      cy.contains('Test User').should('not.exist')
    })
  })

  it('should edit an existing user', () => {
    // Click edit button for first user (João Silva)
    cy.get('[data-cy="edit-user-1"]').click()
    
    // Modal should open with user data
    cy.get('[data-cy="user-modal"]').should('be.visible')
    cy.contains('Editar Usuário').should('be.visible')
    cy.get('[data-cy="user-name-input"]').should('have.value', 'João Silva')
    cy.get('[data-cy="user-email-input"]').should('have.value', 'joao@test.com')
    
    // Edit the user
    cy.get('[data-cy="user-name-input"]').clear().type('João Silva Editado')
    cy.get('[data-cy="user-email-input"]').clear().type('joao.editado@test.com')
    cy.get('[data-cy="user-role-select"]').select('User')
    
    // Save changes
    cy.get('[data-cy="save-user-button"]').click()
    
    // Check if changes were applied
    cy.get('[data-cy="users-table"]').within(() => {
      cy.contains('João Silva Editado').should('be.visible')
      cy.contains('joao.editado@test.com').should('be.visible')
    })
  })

  it('should delete a user', () => {
    // Get initial user count
    cy.get('[data-cy="users-table"] tbody tr').then((rows) => {
      const initialCount = rows.length
      
      // Delete first user
      cy.get('[data-cy="delete-user-1"]').click()
      
      // Confirm deletion (browser confirm dialog)
      cy.window().then((win) => {
        cy.stub(win, 'confirm').returns(true)
      })
      cy.get('[data-cy="delete-user-1"]').click()
      
      // Check if user was removed
      cy.get('[data-cy="users-table"] tbody tr').should('have.length', initialCount - 1)
    })
  })

  it('should cancel user deletion', () => {
    // Get initial user count
    cy.get('[data-cy="users-table"] tbody tr').then((rows) => {
      const initialCount = rows.length
      
      // Try to delete but cancel
      cy.window().then((win) => {
        cy.stub(win, 'confirm').returns(false)
      })
      cy.get('[data-cy="delete-user-1"]').click()
      
      // Check if user count remains the same
      cy.get('[data-cy="users-table"] tbody tr').should('have.length', initialCount)
    })
  })

  it('should logout successfully', () => {
    cy.get('[data-cy="logout-button"]').click()
    
    // Should redirect to login page
    cy.url().should('include', '/login')
    cy.contains('Faça login em sua conta').should('be.visible')
  })

  it('should validate required fields when adding user', () => {
    cy.get('[data-cy="add-user-button"]').click()
    
    // Try to save without filling required fields
    cy.get('[data-cy="save-user-button"]').click()
    
    // Form should not submit (HTML5 validation)
    cy.get('[data-cy="user-name-input"]').should('have.attr', 'required')
    cy.get('[data-cy="user-email-input"]').should('have.attr', 'required')
    
    // Modal should still be open
    cy.get('[data-cy="user-modal"]').should('be.visible')
  })
})
