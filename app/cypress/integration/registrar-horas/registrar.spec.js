import moment from 'moment'
const today = moment().format("DD")

describe('Teste unitário para o registro de horas', () => {
  

  it('Testar nenhum campo setado', () => {
    cy.visit('/login')

    // seta email
    cy.get('[data-cy=input__email]').click()
    cy.get('[data-cy=input__email').type('mgiannoni')

    cy.get('[data-cy=btn__email]').click()

    // seta password
    cy.get('[data-cy=input__pass]').click()
    cy.get('[data-cy=input__pass]').type('123456')

    // confirma o acesso
    cy.get('[data-cy=btn__confirm]').click()
    cy.wait(1000)

    cy.get('[data-cy=registrar__horas]').click()

    cy.get('[data-cy=list__erro]').contains('Determine um número de horas')
    cy.get('[data-cy=list__erro]').contains('Selecione um projeto')
    cy.get('[data-cy=list__erro]').contains('Selecione a fase da tarefa realizada')
    cy.get('[data-cy=list__erro]').contains('Selecione uma subatividade')
    cy.get('[data-cy=list__erro]').contains('Selecione datas no calendário')    
    
  })

  it('Testar somente campo projeto setado', () => {
    cy.visit('/login')

    // seta email
    cy.get('[data-cy=input__email]').click()
    cy.get('[data-cy=input__email').type('mgiannoni')

    cy.get('[data-cy=btn__email]').click()

    // seta password
    cy.get('[data-cy=input__pass]').click()
    cy.get('[data-cy=input__pass]').type('123456')

    // confirma o acesso
    cy.get('[data-cy=btn__confirm]').click()
    cy.wait(1000)

    cy.get('[data-cy=select__projeto]')
    .children('select')
    .select('PIU Jurubatuba')

    cy.get('[data-cy=registrar__horas]').click()
    cy.get('[data-cy=list__erro]').should('not.contain', 'Selecione um projeto')
    
  })

  it('Testar somente campo fase setado', () => {
    cy.visit('/login')

    // seta email
    cy.get('[data-cy=input__email]').click()
    cy.get('[data-cy=input__email').type('mgiannoni')

    cy.get('[data-cy=btn__email]').click()

    // seta password
    cy.get('[data-cy=input__pass]').click()
    cy.get('[data-cy=input__pass]').type('123456')

    // confirma o acesso
    cy.get('[data-cy=btn__confirm]').click()
    cy.wait(1000)

    cy.get('[data-cy=select__fase]')
    .children('select')
    .select('1. Elementos Prévios')

    cy.get('[data-cy=registrar__horas]').click()
    cy.get('[data-cy=list__erro]').should('not.contain', 'Selecione a fase da tarefa realizada')
    
  })

  it('Testar somente campo fase e subatividade setado', () => {
    cy.visit('/login')

    // seta email
    cy.get('[data-cy=input__email]').click()
    cy.get('[data-cy=input__email').type('mgiannoni')

    cy.get('[data-cy=btn__email]').click()

    // seta password
    cy.get('[data-cy=input__pass]').click()
    cy.get('[data-cy=input__pass]').type('123456')

    // confirma o acesso
    cy.get('[data-cy=btn__confirm]').click()
    cy.wait(1000)

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
    cy.visit('/login')

    // seta email
    cy.get('[data-cy=input__email]').click()
    cy.get('[data-cy=input__email').type('mgiannoni')

    cy.get('[data-cy=btn__email]').click()

    // seta password
    cy.get('[data-cy=input__pass]').click()
    cy.get('[data-cy=input__pass]').type('123456')

    // confirma o acesso
    cy.get('[data-cy=btn__confirm]').click()
    cy.wait(1000)

    cy.get('[data-cy=inclui__hora]').click()
    cy.get('[data-cy=inclui__hora]').click()
    cy.get('[data-cy=qtd__horas').should('have.value', 2)
    cy.get('[data-cy=remove__hora').click()
    cy.get('[data-cy=qtd__horas').should('have.value', 1)
    


    cy.get('[data-cy=registrar__horas]').click()
    cy.get('[data-cy=list__erro]').should('not.contain', 'Determine um número de horas')
    
  })

  it('Testar somente campo data setado', () => {
    cy.visit('/login')

    // seta email
    cy.get('[data-cy=input__email]').click()
    cy.get('[data-cy=input__email').type('mgiannoni')

    cy.get('[data-cy=btn__email]').click()

    // seta password
    cy.get('[data-cy=input__pass]').click()
    cy.get('[data-cy=input__pass]').type('123456')

    // confirma o acesso
    cy.get('[data-cy=btn__confirm]').click()
    cy.wait(1000)

    cy.get('[data-cy=select__data]').contains(today).click()
        
    cy.get('[data-cy=registrar__horas]').click()
    cy.get('[data-cy=list__erro]').should('not.contain', 'Selecione datas no calendário')
    
  })

  it('Testar somente com todos os campos preenchidos', () => {
    cy.visit('/login')

    // seta email
    cy.get('[data-cy=input__email]').click()
    cy.get('[data-cy=input__email').type('mgiannoni')

    cy.get('[data-cy=btn__email]').click()

    // seta password
    cy.get('[data-cy=input__pass]').click()
    cy.get('[data-cy=input__pass]').type('123456')

    // confirma o acesso
    cy.get('[data-cy=btn__confirm]').click()
    cy.wait(1000)

    cy.get('[data-cy=select__data]').contains(today).click() // seta a data

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
