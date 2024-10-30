describe("Commenting posts", () => {
    it("should comment a post", () => {
        cy.login()

        const text = "This is a comment by cypress"

        cy.get("#comment:first").click()


        cy.get("#comments:first").should('be.visible')

        cy.get("textarea").type(text)
        cy.contains("button", " Comment ").click()

        cy.contains(text).should('be.visible')

        cy.api("DELETE", "/comments/delete/test")
    })
})