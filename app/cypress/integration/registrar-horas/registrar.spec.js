describe('Teste unitário para o registro de horas', () => {
  beforeEach(() => {
    cy.login('/registrar')
  })
  
  it('Testar nenhum campo setado', () => {
    cy.get('[data-cy=registrar__horas]').click()

    cy.get('[data-cy=list__erro]').contains('Determine um número de horas')
    cy.get('[data-cy=list__erro]').contains('Selecione um projeto')
    cy.get('[data-cy=list__erro]').contains('Selecione a fase da tarefa realizada')
    cy.get('[data-cy=list__erro]').contains('Selecione uma subatividade')
    cy.get('[data-cy=list__erro]').contains('Selecione datas no calendário')    
  })

  it('Testar somente campo projeto setado', () => {
    cy.get('[data-cy=select__projeto]')
    .children('select')
    .select('PIU Jurubatuba')

    cy.get('[data-cy=registrar__horas]').click()
    cy.get('[data-cy=list__erro]').should('not.contain', 'Selecione um projeto')
    
  })

  it('Testar somente campo fase setado', () => {
    cy.get('[data-cy=select__fase]')
    .children('select')
    .select('1. Elementos Prévios')

    cy.get('[data-cy=registrar__horas]').click()
    cy.get('[data-cy=list__erro]').should('not.contain', 'Selecione a fase da tarefa realizada')
  })

  it('Testar somente campo fase e subatividade setado', () => {
    cy.get('[data-cy=select__fase]')
    .children('select')
    .select('1. Elementos Prévios')

    cy.get('[data-cy=select__subatividade]')
    .children('select')
    .select('1.2. Diagnóstico Territorial')

    cy.get('[data-cy=registrar__horas]').click()
    cy.get('[data-cy=list__erro]').should('not.contain', 'Selecione a fase da tarefa realizada')
    cy.get('[data-cy=list__erro]').should('not.contain', 'Selecione uma subatividade')   
  })

  it('Testar somente campo hora setado', () => {
    cy.get('[data-cy=inclui__hora]').click()
    cy.get('[data-cy=inclui__hora]').click()
    cy.get('[data-cy=qtd__horas').should('have.value', 2)
    cy.get('[data-cy=remove__hora').click()
    cy.get('[data-cy=qtd__horas').should('have.value', 1)   

    cy.get('[data-cy=registrar__horas]').click()
    cy.get('[data-cy=list__erro]').should('not.contain', 'Determine um número de horas')
  })

  it('Testar somente campo data setado', () => {
    cy.get('[data-cy=select__data]').then(btn => {
      btn[15].click()
    })
        
    cy.get('[data-cy=registrar__horas]').click()
    cy.get('[data-cy=list__erro]').should('not.contain', 'Selecione datas no calendário')
  })

  it('Testar com todos os campos preenchidos', () => {
    cy.get('[data-cy=select__data]').then(btn => {
      btn[15].click()
    })

    // seta a hora 
    cy.get('[data-cy=inclui__hora]').click() 
    cy.get('[data-cy=inclui__hora]').click()
    cy.get('[data-cy=qtd__horas').should('have.value', 2)
    cy.get('[data-cy=remove__hora').click()
    cy.get('[data-cy=qtd__horas').should('have.value', 1)

    // seta o projeto
    cy.get('[data-cy=select__projeto]')
    .children('select')
    .select('PIU Jurubatuba')

    // seta a fase
    cy.get('[data-cy=select__fase]') 
    .children('select')
    .select('1. Elementos Prévios')

     // seta a subatividade
    cy.get('[data-cy=select__subatividade]')
    .children('select')
    .select('1.2. Diagnóstico Territorial')
    
        
    cy.get('[data-cy=registrar__horas]').click()

    cy.get('[data-cy=modal__message]').contains('Horas cadastradas')
  })
})
