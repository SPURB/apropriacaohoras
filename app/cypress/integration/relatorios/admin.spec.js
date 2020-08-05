describe('Testes de integração para relatório detalhado de admin', () => {
  it('Testa relatório detalhado em desktop', () => {
    cy.viewport(1440, 900)
      .login('/admin/relatorios')
      .get('[data-cy=btn-action]')
      .next()
      .click()
  })
})
