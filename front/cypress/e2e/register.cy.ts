describe('register e2e test', () => {
    it('Different passwords', () => {
        cy.visit('/register')
        cy.wait(500)
        cy.register('RobinGG', 'rago@gmail.com', 'Robinson', 'Gonzalez', new Date('1989-5-19'), 'Apolo12346_', 'Apolo12346')
        cy.wait(500)
      cy.contains("Contraseñas no son iguales").should('be.visible')
    })

    it('invalid name or lastname', () => {
        cy.visit('/register')
        cy.wait(500)
        cy.register('1', '1@gmail.com', '1', '1', new Date('1-1-1'), 'Apolo12346_', 'Apolo12346')
        cy.wait(500)
      cy.contains("Nombre y apellido no pueden tener caracteres especiales").should('be.visible')
    })
 
  
  
    it('correct credentials', () => {
        cy.visit('/register')
        cy.wait(500)
        cy.register()
        cy.wait(500)
      cy.contains('Usuario registrado correctamente').should('be.visible')
  })

})