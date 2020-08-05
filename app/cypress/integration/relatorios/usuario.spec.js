describe('Testes de integração para relatório detalhado de usuário', () => {
  it('Testa relatório detalhado em desktop', () => {
    cy.viewport(1440, 900)
      .fakeLogin('/relatorios')
      .get('[data-cy=btn-action]')
      .click()
  })
})
