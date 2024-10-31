describe('Login e2e test', () => {
  it('wrong credentials', () => {
    cy.login("123123@mgai.com", "12345")
    cy.contains("Usuario o contraseña incorrectos").should('be.visible')
  })

  it("empty spaces goes wrong", () => {
    cy.login("", "")
    cy.contains("Rellena todos los campos").should('be.visible') 
  })

  it("should fail if email is not valid", () => {
    cy.login("juan", "1234567890")
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


  it("should log out", () => {
    cy.login()

    cy.contains("Instapic").should('be.visible')

    cy.get('#log-out').click()

    cy.contains('Inicia sesión').should('be.visible')

  })


  it("should persist session", () => {
    cy.login()
    cy.wait(2000)
    cy.visit('/')
    cy.contains('Instapic').should('be.visible')
  })



})