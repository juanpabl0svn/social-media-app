describe('register e2e test', () => {
    //it('invalid passwords', () => {
      
    //  cy.contains("Contraseñas no son iguales").should('be.visible')
    //})
    //
  //Nombre y apellido no pueden tener caracteres especiales
  
    it('correct credentials', () => {
        cy.visit('/register')
        cy.wait(500)
        cy.register()
        cy.wait(500)
        cy.contains('Usuario registrado correctamente').should('be.visible')
    })

  })