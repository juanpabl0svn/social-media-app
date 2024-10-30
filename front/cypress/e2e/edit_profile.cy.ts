describe("Editing profile", () => {


    it("Edit name", () => {
        cy.login()

        cy.get("#nav-own-profile").click()

        cy.wait(2000)

        cy.contains("Editar perfil").click()

        cy.contains("Ingresar").should("be.visible").click()

        cy.contains("Profile edited successfully").should('be.visible')

    })

})