describe('Teste de integração para o componente calendário', () => {
  beforeEach(() => {
    cy.login('/registrar')
  })

  it('Testar avançar e voltar mês', () => {
    const meses = {
      'JANEIRO': 0,
      'FEVEREIRO': 1,
      'MARÇO': 2,
      'ABRIL': 3,
      'MAIO': 4,
      'JUNHO': 5,
      'JULHO': 6,
      'AGOSTO': 7,
      'SETEMBRO': 8,
      'OUTUBRO': 9,
      'NOVEMBRO': 10,
      'DEZEMBRO': 11
    }
    const currentMonth = Cypress.moment().month()

    cy.get('[data-cy=prox__mes]').click()
      .wait(100)
      .get('[data-cy=mes__atual]')
      .then(el => {
        const text = el.text() // JUNHO · 2020
          .trim()
          .split(' · ')
        
        const mes = text[0].toUpperCase()
        const clickedMonth = meses[mes]

        expect(clickedMonth - 1).to.be.equal(currentMonth)
      })
      .get('[data-cy=prev__mes]').click().click()
      .wait(100)
      .get('[data-cy=mes__atual]')
      .then(el => {
        const text = el.text() // MARÇO · 2020
          .trim()
          .split(' · ')
        
        const mes = text[0].toUpperCase()
        const clickedMonth = meses[mes]

        expect(clickedMonth).to.be.equal(currentMonth -1)
      })
  })

  it('Testar multiplas seleções de datas', () => {
    cy.get('[data-cy=prev__mes]').click()
      .get('[data-cy=select__data]')
      .each((el, index) => {
        if (index < 10) cy.wrap(el).click()
      })
      .get('.selected').then(items => expect(items.length).to.be.greaterThan(1))
      .get('.selected')
      .each(el => {
        cy.wrap(el).click() //'Testar multiplas seleções de datas e remoção de seleção'
      })
  })

  it('Testar registro com multiplas datas no mesmo MÊS', () => {
    cy.get('[data-cy=prev__mes]').click()
      .get('[data-cy=select__data]')
      .each((el, index) => {
        if (index < 10) cy.wrap(el).click()
      })
      .get('[data-cy=inclui__hora]').click() // seta a hora 
      .get('[data-cy=inclui__hora]').click()
      .get('[data-cy=qtd__horas').should('have.value', 2)
      .get('[data-cy=remove__hora').click()
      .get('[data-cy=qtd__horas').should('have.value', 1)
      .get('[data-cy=select__projeto]')// seta o projeto
      .children('select')
      .select('PIU Jurubatuba')
      .get('[data-cy=select__fase]') // seta a fase
      .children('select')
      .select('1. Elementos Prévios')
      .get('[data-cy=select__subatividade]') // seta a subatividade
      .children('select')
      .select('1.2. Diagnóstico Territorial')
      .get('[data-cy=registrar__horas]').click()
      .wait(1000)
      .get('[data-cy=modal__message]').contains('Horas cadastradas')
  })

  it('Testar registro com multiplas datas em meses DIFERENTES', () => {
    cy.get('[data-cy=prev__mes]').click()
      .get('[data-cy=select__data]')
      .each((el, index) => {
        if (index < 10) cy.wrap(el).click()
      })
      .get('[data-cy=prev__mes]').click().click()
      .each((el, index) => {
        if (index < 10) cy.wrap(el).click()
      })
      
    cy.get('[data-cy=inclui__hora]').click()// seta a hora 
      .get('[data-cy=inclui__hora]').click()
      .get('[data-cy=qtd__horas').should('have.value', 2)
      .get('[data-cy=remove__hora').click()
      .get('[data-cy=qtd__horas').should('have.value', 1)

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
      .wait(1000)
      .get('[data-cy=modal__message]').contains('Horas cadastradas')
  })
})