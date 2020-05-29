describe('Teste unitário para verificar o component InputCreate :: Projeto', () => {
  beforeEach(() => {
    cy.login('/admin/projetos') // params: rota que ele vai depois de efetuar login
    /* 
      * Já faz um teste para verificar se o accordion existe 
      está setado para Criar uma nova fase em todos os testes
    */
   cy.get('[data-cy=open__create]')
   .contains('Criar Projeto')
   .click()
  })

  it('Teste input de texto', () => {
    cy.get('[data-cy=input__create]').type('Projeto Teste')
  })

  it('Teste botão de cancelar registro', () => {
    cy.get('[data-cy=input__create]').type('Projeto Teste')
    cy.get('[data-cy=btn__cancel').click()
  })

  it('Teste botão de criação de registro', () => {
    cy.get('[data-cy=input__create]').type('Projeto Teste')
    cy.get('[data-cy=btn__create').click()
  })
})