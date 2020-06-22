describe('Teste de integração para atualizar senha :: LOGADO', () => {
  beforeEach(() => cy.login('/confirmar-senha'))
  
  it('Teste input de confirmação de senha', () => {
    cy.get('[data-cy=current__password]').type('123456')
  })

  it('Teste botão que redireciona para RESET', () => {
    cy.get('[data-cy=current__password]').type('123456')
    cy.get('[data-cy=btn__toReset]')
      .click()
    cy.get('[data-cy=input__fpass]')
      .type('123')
    cy.get('[data-cy=input__spass]')
      .type('123')
    cy.get('[data-cy=btn__reset]')
      .click()
      .wait(2000)
  })
})

describe('Teste de integração para atualizar senha :: NÃO LOGADO', () => {
  it ('Teste as inputs de senha e confirmação de senha', () => {
    cy.visit(`/reset?email=admin@spurbanismo.sp.gov.br&reset=123`)
    cy.get('[data-cy=input__fpass]')
      .type('123456')
    cy.get('[data-cy=input__spass]')
      .type('123456')
  })

  it ('Teste botão reset de senha', () => {
    cy.visit(`/reset?email=admin@spurbanismo.sp.gov.br&reset=123`)
    cy.get('[data-cy=input__fpass]')
      .type('123456')
    cy.get('[data-cy=input__spass]')
      .type('123456')
    cy.get('[data-cy=btn__reset]')
      .click()
  })
})