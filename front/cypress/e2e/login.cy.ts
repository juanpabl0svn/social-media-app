describe('template spec', () => {
  it('wrong credentials', () => {
    cy.login("123123@mgai.com", "12345")

    cy.contains("Usuario o contraseña incorrectos").should('be.visible')


  })


  it('correct credentials', () => {

    cy.login("juan@gmail.com", "1234567890")

    cy.contains('Instapic').should('be.visible')


  })
})