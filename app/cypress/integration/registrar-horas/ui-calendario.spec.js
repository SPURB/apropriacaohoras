describe('Teste unitário para o componente calendário', () => {
  
  it('Testar avançar e voltar mês', () => {
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
    
    cy.get('[data-cy=prox__mes]').click()
    cy.wait(1000)

    cy.get('[data-cy=prev__mes]').click()
  })

  it('Testar multiplas seleções de datas', () => {
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
    
    cy.get('[data-cy=select__data]').then(btn => {
      btn[15].click()
      btn[16].click()
    })
  })

  it('Testar multiplas seleções de datas e remoção de seleção', () => {
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
    
    cy.get('[data-cy=select__data]').then(btn => {
      btn[15].click()
      btn[16].click()
    })

    cy.wait(1000)

    cy.get('[data-cy=select__data]').then(btn => {
      btn[15].click()
      btn[16].click()
    })
  })

  it('Testar registro com multiplas datas no mesmo MÊS', () => {
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

    cy.get('[data-cy=select__data]').then(btn => {
      btn[15].click()
      btn[16].click()
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
    cy.wait(1500)

    cy.get('[data-cy=modal__message]').contains('Horas cadastradas')
    
  })

  it('Testar registro com multiplas datas em meses DIFERENTES', () => {
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

    cy.get('[data-cy=select__data]').then(btn => {
      btn[15].click()
      btn[16].click()
    })
    cy.wait(1000)

    cy.get('[data-cy=prev__mes]').click()
    cy.wait(1000)

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
    cy.wait(1500)

    cy.get('[data-cy=modal__message]').contains('Horas cadastradas')
    
  })
})