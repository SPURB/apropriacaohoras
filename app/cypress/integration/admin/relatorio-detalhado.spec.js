describe('Teste de integração para o registro de horas', () => {
  beforeEach(() => {
    cy.login('/admin/relatorios')
  })

  it('Testar combobox de projetos', () => {
    cy.get('[data-cy=select__option]')
      .children('select')
      .select('PIU Bairros do Tamanduateí')
  })

  it('Testar combobox de projetos e limpar filtros', () => {
    cy.get('[data-cy=select__option]')
      .children('select')
      .select('PIU Bairros do Tamanduateí')
    cy.get('[data-cy=btn__limpar]')
      .click()
  })
})
