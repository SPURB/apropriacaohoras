describe('Teste de integração para verificar o component InputCreate :: Projeto', () => {
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
    cy.inputRandom('[data-cy=input__create]')
  })

  it('Teste botão de cancelar registro', () => {
    cy.inputRandom('[data-cy=input__create]')
      .get('[data-cy=btn__cancel').click()
  })

  it('Teste botão de criação de registro', () => {
    cy.inputRandom('[data-cy=input__create]')
      .get('[data-cy=btn__create').click()
  })
})