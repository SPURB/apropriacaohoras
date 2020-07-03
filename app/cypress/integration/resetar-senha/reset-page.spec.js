describe('Teste de integração para atualizar senha :: LOGADO', () => {
  it('Teste input de confirmação de senha', () => {
    cy.fakeLogin('/admin')
      .get('[data-cy=user-menu]').click()
      .wait(500)
      .get('[data-cy=reset-pass]')
      .click()
      .wait(100)
      .get('[data-cy=current__password]').type('123456')
      .wait(100)
      .get('.btn-progresso').click()
      .location().should(loc => {
        expect(loc.search).to.eq('?email=admin%40spurbanismo.sp.gov.br&reset=123456')
      })
  })
})

describe('Teste de integração para atualizar senha :: NÃO LOGADO', () => {
  const atual = '123456'
  const alterada = '654321'

  it ('Teste botão reset de senha', () => {
    cy.visit(`/reset?email=admin@spurbanismo.sp.gov.br&reset=${atual}`)
      .mock('usuario', '/usuarios/login', 'POST')
      .get('[data-cy=input__fpass]')
      .type(alterada)
      .get('[data-cy=input__spass]')
      .type(alterada)
      .get('[data-cy=btn__reset]')
      .click()
      .get('[data-cy=modal__message]').should(el => {
        expect(el).to.have.text
      })
  })
})