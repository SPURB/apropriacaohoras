describe('Teste de integração página relatórios', () => {
  beforeEach(() => {
    cy.fakeLogin('/admin/relatorios') // params: rota que ele vai depois de efetuar login
  })

  it('Teste `ver mais detalhes do projeto`', () => {
    cy.get('[data-cy=pedaco__projeto]').then(pedaco => {
      pedaco[0].click()
    })
  })
})
