describe('Teste unitário para verificar se routers-links estão oks', () => {
  beforeEach(() => {
    cy.login('/admin')
  })

  it('Testar router-link para `admin/equipes`', () => {
    cy.get('[data-cy=card__router__equipe]').click()
  })

  it('Testar router-link para `admin/projetos`', () => {
    cy.get('[data-cy=card__router__projetos]').click()
  })

  it('Testar router-link para `admin/relatorios`', () => {
    cy.get('[data-cy=card__router__relatorios]').click()
  })
})