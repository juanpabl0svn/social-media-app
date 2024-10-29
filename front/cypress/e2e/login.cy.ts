describe('Login e2e test', () => {
  it('wrong credentials', () => {
    cy.login("123123@mgai.com", "12345")
    cy.contains("Usuario o contraseña incorrectos").should('be.visible')
  })


  it('correct credentials', () => {
    cy.login("juan@gmail.com", "1234567890")
    cy.contains('Bienvenido Juan Pablo Sanchez').should('be.visible')
  })

  it("should take me to register", () => {
    cy.visit('/')
    cy.get('a:first').click()
    cy.contains('Regístrate').should('be.visible')
  })
})