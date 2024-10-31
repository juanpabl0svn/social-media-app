describe("uploading a photo", () => {


    it("should upload photo", () => {

        const text = "This is a photo uploaded by cypress"

        cy.login()

        cy.get("#nav-own-profile").click()

        cy.wait(2000)

        cy.contains("+").click()

        cy.get("#file").attachFile("image.jpg")


        cy.get("#description").type(text)

        cy.contains("button", "Subir").should("be.visible").click({ force: true })

        cy.wait(3000)

        // cy.contains("Post creado correctamente")


        cy.get("#posts > img:first").click()

        cy.contains(text).should('be.visible')

        cy.api("DELETE", "/post/delete/test")

        cy.wait(2000)

    })


})