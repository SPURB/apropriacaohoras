Cypress.Commands.add('login', nextPath => {
  const apiUrl = `${Cypress.env('API_BASE_URL')}/usuarios/login`
  cy.clearLocalStorage()
    .visit('/')
    .wait(1200)
    .get('[data-cy=input__email]')
    .click()
    .get('[data-cy=input__email')
    .type('admin')
    .get('[data-cy=btn__email]')
    .click()
    .get('[data-cy=input__pass]')
    .click()
    .get('[data-cy=input__pass]')
    .type('123456')
    .get('[data-cy=btn__confirm]')
    .click()
    .wait(1200)
    .visit(nextPath)
})

// para casos que a autentição real não é necessária
Cypress.Commands.add('fakeLogin', nextPath => {
  const apiUrl = `${Cypress.env('API_BASE_URL')}/usuarios/login`
  cy.clearLocalStorage()
    .visit('/')
    .get('[data-cy=input__email]')
    .click()
    .get('[data-cy=input__email')
    .type('admin')
    .get('[data-cy=btn__email]')
    .click()
    .get('[data-cy=input__pass]')
    .click()
    .get('[data-cy=input__pass]')
    .type('123456')
    .server()
    .route('POST', apiUrl, 'fixture:usuario.login.post')
    .as('login')
    .get('[data-cy=btn__confirm]')
    .click()
    .wait(300)
    .visit(nextPath)
})

/*
 * exemplo de uso:
 * cy.mock('usuario', '/usuarios/login', 'POST')
 * cy.mock('usuario', '/usuarios/5', 'PUT', 5)
 */
Cypress.Commands.add(
  'mock',
  (resource, path, method = 'GET', as = resource) => {
    const resources = {
      POST: {
        usuario: 'fixture:usuario.login.post'
      },
      PUT: {
        usuario: `fixture:usuario.put`
      }
    }

    cy.server()
      .route(
        method,
        `${Cypress.env('API_BASE_URL')}${path}`,
        resources[method][resource]
      )
      .as(as)
  }
)

Cypress.Commands.add('inputRandom', selector => {
  const randomString = Math.random()
    .toString(36)
    .slice(2)

  cy.get(selector).type(`cy__${randomString}`)
})
