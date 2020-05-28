describe('Teste unitário para verificar o component InputCreate :: Fase', () => {
  beforeEach(() => {
    cy.login('/admin/projetos')
  })

  it ('Teste router-link para step__fase', () => {
    cy.wait(1000)
    cy.get('[data-cy=step__projetos]')
    .children('li').children('a')
    .then(projetos => {
      projetos[5].click()
    })
  })

  it('Teste para abrir accordion de registro', () => {
    cy.get('[data-cy=open__create]').click()
  })

  it('Teste input de texto', () => {
    cy.get('[data-cy=open__create]').click()
    cy.get('[data-cy=input__create]').type('Fase Teste')
  })

  it('Teste botão de cancelar registro', () => {
    cy.get('[data-cy=open__create]').click()
    cy.get('[data-cy=input__create]').type('Fase Teste')
    cy.get('[data-cy=btn__cancel').click()
  })

  /* it('Teste botão de criação de registro', () => {
    cy.get('[data-cy=open__create]').click()
    cy.get('[data-cy=input__create]').type('Fase Teste')
    cy.get('[data-cy=btn__create').click()
  }) */
})