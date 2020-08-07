describe('Teste de integração página relatórios', () => {
  beforeEach(() => {
    cy.fakeLogin('/admin/relatorios')
  })

  it('Teste ver mais detalhes do projeto muda de título após clicar em primeiro e último retângulo', () => {
    cy.get('[data-cy=pedaco__projeto]')
      .first()
      .click()
      .get('[data-cy=projeto__title]')
      .then(el => {
        const nomeProjeto = el.text()
        cy.get('[data-cy=pedaco__projeto]')
          .last()
          .click()
          .get('[data-cy=projeto__title]')
          .should('not.contain', nomeProjeto)
      })
  })
})
