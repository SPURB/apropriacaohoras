describe('Teste de integração para verificar o component InputCreate :: Fase', () => {
  beforeEach(() => {
    cy.login('/admin/projetos') // params: rota que ele vai depois de efetuar login
      .wait(100)
      .get('[data-cy=step__projetos]') // Para ir pro NavLinkLateral :: Fase tem que clicar em 1 projeto
      .children('li').children('a')
      .then(projetos => {
        projetos[5].click() // Click no 5 elemento/projeto
      })

    /* 
      * Já faz um teste para verificar se o accordion existe 
      está setado para Criar uma nova fase em todos os testes
    */
    cy.get('[data-cy=open__create]')
      .contains('Criar Fase')
      .click()
  })

  it('Teste input de texto', () => {
    cy.get('[data-cy=input__create]').type('Fase Teste')
  })

  it('Teste botão de cancelar registro', () => {
    cy.get('[data-cy=input__create]').type('Fase Teste')
      .get('[data-cy=btn__cancel').click()
  })

  it('Teste botão de criação de registro', () => {
    cy.inputRandom('[data-cy=input__create]') //get('[data-cy=input__create]').type(`cy__${ randomString() }`)
      .get('[data-cy=btn__create')
      .click()
      .wait(3000)
      .get('[data-cy=modal__title]').contains('Fase cadastrado')
  })
})