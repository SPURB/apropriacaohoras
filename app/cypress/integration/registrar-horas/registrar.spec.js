describe('Teste de integração para o registro de horas', () => {
  beforeEach(() => {
    cy.login('/registrar')
  })
  
  it('Testar nenhum campo setado', () => {
    cy.get('[data-cy=registrar__horas]')
      .click()
      .get('[data-cy=list__erro]').contains('Determine um número de horas')
      .get('[data-cy=list__erro]').contains('Selecione um projeto')
      .get('[data-cy=list__erro]').contains('Selecione a fase da tarefa realizada')
      .get('[data-cy=list__erro]').contains('Selecione uma subatividade')
      .get('[data-cy=list__erro]').contains('Selecione datas no calendário')
  })

  it('Testar somente campo projeto setado', () => {
    cy.get('[data-cy=select__projeto]')
      .children('select')
      .select('PIU Jurubatuba')
      .get('[data-cy=registrar__horas]').click()
      .get('[data-cy=list__erro]').should('not.contain', 'Selecione um projeto')
  })

  it('Testar somente campo fase setado', () => {
    cy.get('[data-cy=select__fase]')
      .children('select')
      .select('1. Elementos Prévios')
      .get('[data-cy=registrar__horas]').click()
      .get('[data-cy=list__erro]').should('not.contain', 'Selecione a fase da tarefa realizada')
  })

  it('Testar somente campo fase e subatividade setado', () => {
    cy.get('[data-cy=select__fase]')
      .children('select')
      .select('1. Elementos Prévios')
      .get('[data-cy=select__subatividade]')
      .children('select')
      .select('1.2. Diagnóstico Territorial')
      .get('[data-cy=registrar__horas]').click()
      .get('[data-cy=list__erro]').should('not.contain', 'Selecione a fase da tarefa realizada')
      .get('[data-cy=list__erro]').should('not.contain', 'Selecione uma subatividade')   
  })

  it('Testar somente campo hora setado', () => {
    cy.get('[data-cy=inclui__hora]').click().click()
      .get('[data-cy=qtd__horas').should('have.value', 2)
      .get('[data-cy=remove__hora').click()
      .get('[data-cy=registrar__horas]').click()
      .get('[data-cy=list__erro]').should('not.contain', 'Determine um número de horas')
  })

  it('Testar somente campo data setado', () => {
    cy.get('.danger').then(btn => { btn[0] .click()  })
      .get('[data-cy=registrar__horas]').click()
      .get('[data-cy=list__erro]')
      .should('not.contain', 'Selecione datas no calendário')
  })

  it('Testar com todos os campos preenchidos', () => {
    cy.get('.danger').then(btn => { btn[0] .click()  })
      .get('[data-cy=inclui__hora]').click().click()
      .get('[data-cy=qtd__horas').should('have.value', 2)
      .get('[data-cy=remove__hora').click()
      .get('[data-cy=qtd__horas').should('have.value', 1)
      .get('[data-cy=select__projeto]')
      .children('select')
      .select('PIU Jurubatuba')
      .get('[data-cy=select__fase]') 
      .children('select')
      .select('1. Elementos Prévios')
      .get('[data-cy=select__subatividade]')
      .children('select')
      .select('1.2. Diagnóstico Territorial')
      .get('[data-cy=registrar__horas]').click()
      .get('[data-cy=modal__message]').contains('Horas cadastradas')
  })
})
