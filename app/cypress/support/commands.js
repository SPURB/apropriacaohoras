// ***********************************************
// This example commands.js shows you how to
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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (nextPath) => {
  cy.visit('/login')

  cy.get('[data-cy=input__email]').click()
  cy.get('[data-cy=input__email').type('mgiannoni')

  cy.get('[data-cy=btn__email]').click()

  // seta password
  cy.get('[data-cy=input__pass]').click()
  cy.get('[data-cy=input__pass]').type('123456')

  // confirma o acesso
  cy.get('[data-cy=btn__confirm]').click()

  cy.wait(2500)

  cy.visit(nextPath)
})
