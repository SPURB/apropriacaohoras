describe('Teste unitário para verificar se routers-links estão oks', () => {
  beforeEach(() => {
    cy.login('/admin/equipes')
  })

  const id = 2 // id do usuario para teste
  const nome = 'MAURÍCIO DANTAS' // nome do usuário do id passado

  it('Testar seleção da combobox', () => {
    cy.get('[data-cy=btn__projetos]').click()
    cy.wait(500) // espera mostrar a box
    cy.get('[data-cy=select__projeto]').then(btn => btn[1].click())

  })

  it('Testar remoção de usuário cadastrado no projeto', () => {
    cy.get('[data-cy=btn__projetos]').click()
    cy.wait(500) // espera mostrar a box
    cy.get('[data-cy=select__projeto]').then(btn => btn[1].click())

    cy.get('[data-cy=usuario__projeto]')
    .find(`#card__btn--${id}`).click()
    cy.wait(1300)
  })

  it('Testar busca e seleção de usuário para cadastrar no projeto', () => {
    cy.get('[data-cy=btn__projetos]').click()
    cy.wait(500) // espera mostrar a box
    cy.get('[data-cy=select__projeto]').then(btn => btn[1].click())

    cy.get('[data-cy=search__usuario]').type(nome)
    cy.get('[data-cy=inclui__usuario]')
    .filter(`input#lista--${id}`).click({ force: true })
  })
})