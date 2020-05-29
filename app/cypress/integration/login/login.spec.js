describe('Teste unitário para o login de usuário', () => {

  it('Testar ambos os campos errados', () => {
    cy.visit('/login')

    // seta email
    cy.get('[data-cy=input__email]').click()
    cy.get('[data-cy=input__email').type('mgianndoni')

    cy.get('[data-cy=btn__email]').click()

    // seta password
    cy.get('[data-cy=input__pass]').click()
    cy.get('[data-cy=input__pass]').type('12345d6')

    // confirma erro
    cy.get('[data-cy=btn__confirm]').click()

    // verifica erro emitido
    cy.get('[data-cy=modal__message]').contains('Usuário não autenticado')
  })

  it('Testar com campo e-mail errado', () => {
    cy.visit('/login')

    // seta email
    cy.get('[data-cy=input__email]').click()
    cy.get('[data-cy=input__email').type('mgiannoddni')

    cy.get('[data-cy=btn__email]').click()

    // seta password
    cy.get('[data-cy=input__pass]').click()
    cy.get('[data-cy=input__pass]').type('123456')

    // confirma acesso
    cy.get('[data-cy=btn__confirm]').click()

    // verifica erro emitido
    cy.get('[data-cy=modal__message]').contains('Usuário não autenticado')
  })

  it('Testar com campo senha errado', () => {
    cy.visit('/login')

    // seta email
    cy.get('[data-cy=input__email]').click()
    cy.get('[data-cy=input__email').type('mgiannoni')

    cy.get('[data-cy=btn__email]').click()

    // seta password
    cy.get('[data-cy=input__pass]').click()
    cy.get('[data-cy=input__pass]').type('123456dd')

    // confirma o acesso
    cy.get('[data-cy=btn__confirm]').click()

    // verifica erro emitido
    cy.get('[data-cy=modal__message]').contains('Usuário não autenticado')
  })

  it('Testar com ambos corretos', () => {
    cy.visit('/login')

    // seta email
    cy.get('[data-cy=input__email]').click()
    cy.get('[data-cy=input__email').type('mgiannoni')

    cy.get('[data-cy=btn__email]').click()

    // seta password
    cy.get('[data-cy=input__pass]').click()
    cy.get('[data-cy=input__pass]').type('123456')

    // confirma o acesso
    cy.get('[data-cy=btn__confirm]').click()
  })
})