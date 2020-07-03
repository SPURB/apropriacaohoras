describe('Teste de integração para o login de usuário', () => {
  const apiUrl = `${Cypress.env('API_BASE_URL')}/usuarios/login`
  it('Testar ambos os campos errados', () => {
    cy.visit('/login')
      .get('[data-cy=input__email]').click()
      .get('[data-cy=input__email').type('adminasd')
      .get('[data-cy=btn__email]').click()
      .get('[data-cy=input__pass]').click()
      .get('[data-cy=input__pass]').type('12345d6')
      .get('[data-cy=btn__confirm]').click()
      .get('[data-cy=modal__message]').contains('Usuário não autenticado')
  })

  it('Testar com campo e-mail errado', () => {
    cy.visit('/login')
      .get('[data-cy=input__email]').click()
      .get('[data-cy=input__email').type('adminasd')
      .get('[data-cy=btn__email]').click()
      .get('[data-cy=input__pass]').click()
      .get('[data-cy=input__pass]').type('123456')
      .get('[data-cy=btn__confirm]').click()
      .get('[data-cy=modal__message]').contains('Usuário não autenticado')
  })

  it('Testar com campo senha errado', () => {
    cy.visit('/login')
      .get('[data-cy=input__email]').click()
      .get('[data-cy=input__email').type('admin')
      .get('[data-cy=btn__email]').click()
      .get('[data-cy=input__pass]').click()
      .get('[data-cy=input__pass]').type('123456dd')
      .get('[data-cy=btn__confirm]').click()
      .get('[data-cy=modal__message]').contains('Usuário não autenticado')
  })

  it('Testar com ambos corretos', () => {
    cy.visit('/login')
      .get('[data-cy=input__email]').click()
      .get('[data-cy=input__email').type('admin')
      .get('[data-cy=btn__email]').click()
      .get('[data-cy=input__pass]').click()
      .get('[data-cy=input__pass]').type('123456')
      .server()
      .route('POST', apiUrl, 'fixture:usuario.login.post').as('login')
      .get('[data-cy=btn__confirm]').click()
      .get('[data-cy=user-info__name]').contains('ADMIN TESTE')
  })
})