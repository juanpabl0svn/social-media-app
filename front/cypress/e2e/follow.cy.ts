describe("Following users", () => {

    it("should follow a user", () => {
        cy.login()

        cy.wait(2000)

        cy.get("#profile-nav:first").click()

        cy.wait(2000)

        cy.contains("Seguir").click()

        cy.wait(2000)


        cy.contains("Pendiente").should('be.visible')
    })


    it("should unfollow", () => {

        cy.login()

        cy.wait(2000)

        cy.get("#profile-nav:last").click()

        cy.wait(2000)


        cy.contains("Pendiente").should('be.visible').click()
        cy.wait(2000)

        cy.contains("Seguir")


    })

})