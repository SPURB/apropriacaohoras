describe('Testes de integração páginas de pré-impressão', () => {
  beforeEach(() => {
    cy.fakeLogin('/admin/')
  })

  it('Verifica se folha está sendo renderizado duas folhas em /relatorio', () => {
    let startPageNum
    cy.visit('/relatorios/')
      .get('[data-cy=btn-action]')
      .click()
      .get('[data-cy=pre-impressao__pagina]')
      .then(el => {
        startPageNum = parseInt(el.text())
        cy.log(startPageNum)
      })
    cy.get('[data-cy=btn-progresso]')
      .click()
      .get('[data-cy=pre-impressao__page-counter]')
      .then(el => {
        const endPageNum = parseInt(el.text())
        cy.wrap({ endPageNum })
          .its('endPageNum')
          .should('to.be.greaterThan', startPageNum)
      })
  })

  it('Verifica página de pré-impressão para admin  /admin/relatorio', () => {
    let startPageNum
    cy.visit('/admin/relatorios')
      .get('[data-cy=btn-action]')
      .next()
      .click()
      .get('[data-cy=pre-impressao__pagina]')
      .then(el => {
        startPageNum = parseInt(el.text())
        cy.log(startPageNum)
      })
      .get('[data-cy=btn-progresso]')
      .click()
      .get('[data-cy=pre-impressao__page-counter]')
      .then(el => {
        const endPageNum = parseInt(el.text())
        cy.wrap({ endPageNum })
          .its('endPageNum')
          .should('to.be.greaterThan', startPageNum)
      })
  })
})
