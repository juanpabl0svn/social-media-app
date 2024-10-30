/// <reference types="cypress" />

import 'cypress-file-upload';



const API_URL = "http://localhost:3000"

Cypress.Commands.add('login', (email: string = "juan@gmail.com", password: string = "1234567890") => {
    cy.visit('/')

    cy.wait(500)

    cy.get('#email').click().type(email)

    cy.get('#password').type(password, { force: true });

    cy.get('button:last').click()

}
)


Cypress.Commands.add('api', (method: string, endpoint: string, body: any = {}) => {
    return cy.request(method, API_URL + endpoint, body)
})

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }