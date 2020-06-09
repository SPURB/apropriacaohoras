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

Cypress.Commands.add('login', (nextPath) => {
  cy.clearLocalStorage()
    .visit('/login')
    .wait(1200)
    .get('[data-cy=input__email]').click()
    .get('[data-cy=input__email').type('admin')
    .get('[data-cy=btn__email]').click()
    .get('[data-cy=input__pass]').click()
    .get('[data-cy=input__pass]').type('123456')
    .get('[data-cy=btn__confirm]').click()
    .wait(1200)
    .visit(nextPath)
})

Cypress.Commands.add('inputRandom', selector => {
  const randomString = Math.random().toString(36).slice(2)

  cy.get(selector)
    .type(`cy__${randomString}`)
})