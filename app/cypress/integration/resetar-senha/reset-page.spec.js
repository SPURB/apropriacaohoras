describe('Teste de integração para atualizar senha :: LOGADO', () => {

  it('Teste input de confirmação de senha', () => {
    cy.login('/admin')
      .get('#user-menu').click()
      .wait(500)
      .get('.class-user-info')
      .then(els => els.toArray().find(el => el.innerText === ' Redefinir senha'))
      .click()
      .wait(100)
      .get('[data-cy=current__password]').type('123456')
      .wait(100)
      .get('.btn-progresso.auth__btn').click()
      .location().should(loc => {
        expect(loc.search).to.eq('?email=admin%40spurbanismo.sp.gov.br&reset=123456')
      })
  })
})

describe('Teste de integração para atualizar senha :: NÃO LOGADO', () => {
  const atual = '123456'
  const alterada = '654321'

  it ('Teste as inputs de senha e confirmação de senha', () => {
    cy.visit(`/reset?email=admin@spurbanismo.sp.gov.br&reset=${atual}`)
      .get('[data-cy=input__fpass]')
      .type(alterada)
      .get('[data-cy=input__spass]')
      .type(alterada)
  })

  it ('Teste botão reset de senha', () => {
    cy.visit(`/reset?email=admin@spurbanismo.sp.gov.br&reset=${atual}`)
      .get('[data-cy=input__fpass]')
      .type(alterada)
      .get('[data-cy=input__spass]')
      .type(alterada)
      .get('[data-cy=btn__reset]')
      .click()
      .wait(1000)
      .get('.modal__action').click()
      .get('[data-cy=input__pass]')
      .type(alterada)
      .get('[data-cy=btn__confirm]').click()
      .get('.user-info__name')
      .then(els => {
        expect(els.toArray()[0].innerText).to.be.eq('ADMIN TESTE')
      })
  })
})