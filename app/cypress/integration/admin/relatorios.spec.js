describe('Teste unitário página relatórios', () => {
  beforeEach(() => {
    cy.login('/admin/relatorios') // params: rota que ele vai depois de efetuar login
  })

  it('Teste `ver mais detalhes do projeto`', () => {
    cy.get('[data-cy=pedaco__projeto]').then(pedaco => {
      pedaco[0].click()
    })
  })
})
