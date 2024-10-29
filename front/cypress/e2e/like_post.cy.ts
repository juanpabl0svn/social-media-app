describe("Liking a post", () => {
    it("should like or dislike a post", async () => {

        cy.login()

        cy.get("#likes_count:first").should('be.visible').invoke('text').then((text) => {
            const last_likes_count = +text;

            cy.get('#like:first').click();

            cy.get("#likes_count:first").should('be.visible').invoke('text').then((newText) => {
                const new_likes_count = +newText;
                const difference = Math.abs(new_likes_count - last_likes_count);

                expect(difference).to.equal(1);
            });
        });


    })
})