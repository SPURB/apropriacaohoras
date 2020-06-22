describe('Teste de integração para verificar o component InputCreate :: Grupos', () => {
  beforeEach(() => {
    cy.login('/admin/grupos') // params: rota que ele vai depois de efetuar login
    /* 
      * Já faz um teste para verificar se o accordion existe 
      está setado para Criar uma nova fase em todos os testes
    */
   cy.get('[data-cy=open__create]')
   .contains('Criar grupo de projetos')
   .click()
  })

  it('Teste inputs de texto :: Create', () => {
    cy.inputRandom('[data-cy=input__create]')
    cy.inputRandom('[data-cy=input__meta]')
  })

  it('Teste botão de cancelar registro :: Create', () => {
    cy.inputRandom('[data-cy=input__create]')
    cy.inputRandom('[data-cy=input__meta]')
    cy.get('[data-cy=btn__cancel]')
      .click()
  })

  it('Teste botão de salvar registro :: Create', () => {
    cy.inputRandom('[data-cy=input__create]')
    cy.inputRandom('[data-cy=input__meta]')
    cy.get('[data-cy=btn__create]')
      .click()
      .get('[data-cy=modal__title]')
      .contains('Grupo cadastrado')
  })  
})

describe('Teste de integração para o CardUpdate :: Grupos', () => {
  beforeEach(() => cy.login('/admin/grupos'))

  it('Teste inputs de texto :: Update', () => {
    cy.get('[data-cy=btn__editar]')
      .last().click()
    cy.get('[data-cy=input__titulo]')
      .last().type(' ADD')
    cy.get('[data-cy=input__descricao]')
      .last().type(' ADD')
  })

  it('Teste botão de cancelar registro :: Update', () => {
    cy.get('[data-cy=btn__editar]')
      .last().click()
    cy.get('[data-cy=input__titulo]')
      .last().type(' ADD')
    cy.get('[data-cy=input__descricao]')
      .last().type(' ADD')

    cy.get('[data-cy=update__cancel]')
      .last().click()
  })

  it('Teste botão de salvar registro :: Update', () => {
    cy.get('[data-cy=btn__editar]')
      .last().click()
    cy.get('[data-cy=input__titulo]')
      .last().type(' ADD')
    cy.get('[data-cy=input__descricao]')
      .last().type(' ADD')

    cy.get('[data-cy=btn__update]')
      .last().click()
      .get('[data-cy=modal__title]')
      .contains('Grupo atualizado') 
  })
})