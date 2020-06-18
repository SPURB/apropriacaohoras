describe('Teste de integração para verificar o component InputCreate :: Subatividades', () => {
  beforeEach(() => {
    cy.login('/admin/projetos?grupo=3&grupoName=Projetos de Intervenção Urbana&grupoDescription=Decreto nº 56.901%2F2016') // params: rota que ele vai depois de efetuar login

    cy.get('[data-cy=step__projetos]') // Para ir pro NavLinkLateral :: Fase tem que clicar em 1 projeto
      .children('li').children('div')
      .children('section').first()
      .click()    

    cy.get('[data-cy=step__fases]') // Para ir pro NavLinkLateral :: Fase tem que clicar em 1 projeto
      .children('li').children('div')
      .children('section').first()
      .click() 
    /* 
      * Já faz um teste para verificar se o accordion existe 
      está setado para Criar uma nova fase em todos os testes
    */
    cy.get('[data-cy=open__create]')
    .contains('Criar Subatividade')
    .click()
  })

  it('Teste input de texto', () => {
    cy.get('[data-cy=input__create]').type('Subatividade Teste')
  })

  it('Teste botão de cancelar registro', () => {
    cy.get('[data-cy=input__create]').type('Subatividade Teste')
      .get('[data-cy=btn__cancel').click()
  })

  it('Teste botão de criação de registro', () => {
    cy.inputRandom('[data-cy=input__create]')
      .get('[data-cy=btn__create').click()
      .get('[data-cy=modal__title]').contains('Subatividade criado')
  })

})

describe('Teste de integração para verificar o component InputUpdate :: Subatividades', () => {
  beforeEach(() => {
    cy.login('/admin/projetos?grupo=3&grupoName=Projetos de Intervenção Urbana&grupoDescription=Decreto nº 56.901%2F2016') // params: rota que ele vai depois de efetuar login
      .wait(100)
      
    cy.get('[data-cy=step__projetos]') // Para ir pro NavLinkLateral :: Fase tem que clicar em 1 projeto
      .children('li').children('div')
      .children('section').first()
      .click()    

    cy.get('[data-cy=step__fases]') // Para ir pro NavLinkLateral :: Fase tem que clicar em 1 projeto
      .children('li').children('div')
      .children('section').first()
      .click() 
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
