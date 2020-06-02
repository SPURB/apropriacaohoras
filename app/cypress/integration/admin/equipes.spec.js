describe('Teste de integração para verificar se routers-links estão oks', () => {
  beforeEach(() => {
    cy.login('/admin/equipes')
  })

  const id = 2 // id do usuario para teste
  const nome = 'MAURÍCIO DANTAS' // nome do usuário do id passado

  it('Testar seleção da combobox', () => {
    cy.get('[data-cy=btn__options]').click()
      .wait(500) // espera mostrar a box
      .get('[data-cy=select__option]').then(btn => btn[1].click())
  })

  it('Testar remoção de usuário cadastrado no projeto', () => {
    cy.get('[data-cy=btn__options]').click()
      .wait(500) // espera mostrar a box
      .get('[data-cy=select__option]').then(btn => btn[1].click())
      .get('[data-cy=usuario__projeto]')
      .wait(1000)
      .get(`[type=checkbox]#lista--${id}`).click({ force: true })
      .wait(1300)
  })

  it('Testar busca e seleção de usuário para cadastrar no projeto', () => {
    cy.get('[data-cy=btn__options]').click()
      .wait(500) // espera mostrar a box
      .get('[data-cy=select__option]').then(btn => btn[1].click())
      .get('[data-cy=search__usuario]').type(nome)
      .get(`input#lista--${id}`).click({ force: true })
  })
})