describe('Teste de integração para verificar o component InputCreate :: Projeto', () => {
  beforeEach(() => {
    cy.login('/admin/projetos?grupo=3&grupoName=Projetos de Intervenção Urbana&grupoDescription=Decreto nº 56.901%2F2016') // params: rota que ele vai depois de efetuar login
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

describe('Teste de integração para verificar o component InputUpdate :: Projeto', () => {
  beforeEach(() => {
    cy.login('/admin/projetos?grupo=3&grupoName=Projetos de Intervenção Urbana&grupoDescription=Decreto nº 56.901%2F2016') // params: rota que ele vai depois de efetuar login
    /* 
      * Já faz um teste para verificar se o accordion existe 
      está setado para Criar uma nova fase em todos os testes
    */
   cy.get('[data-cy=btn__editar]')
   .first()
   .click()
  })

  it('Teste input de texto :: InputUpdate', () => {
    cy.inputRandom('[data-cy=input__update]')
  })

  it('Teste botão de cancelar registro', () => {
    cy.inputRandom('[data-cy=input__update]')
      .get('[data-cy=update__cancel').click()
  })
})