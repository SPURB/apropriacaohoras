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
  const apiUrl = `${Cypress.env('API_BASE_URL')}/usuarios/login`
  cy.clearLocalStorage()
    .visit('/')
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

// para casos que a autentição real não é necessária
Cypress.Commands.add('fakeLogin', (nextPath) => {
  const apiUrl = `${Cypress.env('API_BASE_URL')}/usuarios/login`
  cy.clearLocalStorage()
    .visit('/')
    .get('[data-cy=input__email]').click()
    .get('[data-cy=input__email').type('admin')
    .get('[data-cy=btn__email]').click()
    .get('[data-cy=input__pass]').click()
    .get('[data-cy=input__pass]').type('123456')
    .server()
    .route('POST', apiUrl, 'fixture:usuario.login.post').as('login')
    .get('[data-cy=btn__confirm]').click()
    .wait(300)
    .visit(nextPath)
})

/*
  * exemplo de uso:
  * cy.mock('usuario', '/usuarios/login', 'POST')
  * cy.mock('usuario', '/usuarios/5', 'PUT', 5)
*/
Cypress.Commands.add('mock', (resource, path, method = 'GET', as = resource) => {

  const resources = {
    'POST': {
      'usuario': 'fixture:usuario.login.post'
    },
    'PUT': {
      'usuario': `fixture:usuario.put`
    }
  }

  cy.server()
    .route(method, `${Cypress.env('API_BASE_URL')}${path}`, resources[method][resource]).as(as)
})

Cypress.Commands.add('inputRandom', selector => {
  const randomString = Math.random().toString(36).slice(2)

  cy.get(selector)
    .type(`cy__${randomString}`)
})