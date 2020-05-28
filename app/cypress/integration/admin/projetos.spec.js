describe('Teste unitário para verificar o component InputCreate :: Projeto', () => {
  beforeEach(() => {
    cy.login('/admin/projetos')
  })

  it('Teste para abrir accordion de registro', () => {
    cy.get('[data-cy=open__create]').click()
  })

  it('Teste input de texto', () => {
    cy.get('[data-cy=open__create]').click()
    cy.get('[data-cy=input__create]').type('Projeto Teste')
  })

  it('Teste botão de cancelar registro', () => {
    cy.get('[data-cy=open__create]').click()
    cy.get('[data-cy=input__create]').type('Projeto Teste')
    cy.get('[data-cy=btn__cancel').click()
  })

  /* it('Teste botão de criação de registro', () => {
    cy.get('[data-cy=open__create]').click()
    cy.get('[data-cy=input__create]').type('Projeto Teste')
    cy.get('[data-cy=btn__create').click()
  }) */
})