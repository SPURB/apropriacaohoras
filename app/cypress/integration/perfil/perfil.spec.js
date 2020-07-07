describe('Teste de integração para página de Perfil', () => {
    beforeEach(() => {
      cy.login('/perfil')
    })

    it('Testar open formulario', () => {
      cy.get('[data-cy=open__update]').click()
    })
  
    it('Testar botão de cancelar', () => {
      cy.get('[data-cy=open__update]').click()
      cy.get('[data-cy=update__cancel]').click()
    })

    it('Testar alteração nas inputs', () => {
      cy.get('[data-cy=open__update]').click()
        .wait(300)
        .inputRandom('[data-cy=input__update]')
        .inputRandom('[data-cy=input__email]')
        .inputRandom('[data-cy=input__nprodam]')
    })

    it('Testar alteração de usuário', () => { // somente nome e nprodam para não quebrar os outros teste
      const apiUrl = `${Cypress.env('API_BASE_URL')}/usuarios`
      cy.get('[data-cy=open__update]').click()
        .wait(300)
        .inputRandom('[data-cy=input__update]')
        .inputRandom('[data-cy=input__nprodam]')
        .server()
        .route('PUT', apiUrl, 'fixture:usuario.put').as('usuario')
        .get('[data-cy=btn__update]').click()
    })
})

