describe("Following users", () => {

    it("should follow a user and unfollow it", () => {
        cy.login()

        cy.wait(500)

        cy.get("#profile-nav:first").click()

        cy.wait(500)

        cy.contains("Seguir").click()

        cy.wait(500)


        cy.contains("Pendiente").should('be.visible').click()
    })

})