describe('Teste de integração para verificar se routers-links estão oks', () => {
  beforeEach(() => {
    cy.login('/admin/equipes')
  })

  const id = 5 // id do usuario para teste
  const nome = 'ADMIN TESTE' // nome do usuário do id passado

  it('Testar seleção da combobox', () => {
    cy.get('[data-cy=btn__options]')
      .then(dropdown => dropdown[0].click())
      .wait(500) // espera mostrar a box
      .get('[data-cy=select__option]').then(btn => btn[3].click())
      .wait(500)
      .get('[data-cy=btn__options]')
      .then(dropdown => dropdown[1].click())
      .wait(500) // espera mostrar a box
      .get('[data-cy=select__option]').then(btn => btn[6].click())
  })

  it('Testar remoção de usuário cadastrado no projeto', () => {
    cy.get('[data-cy=btn__options]')
      .then(dropdown => dropdown[0].click())
      .wait(500) // espera mostrar a box
      .get('[data-cy=select__option]').then(btn => btn[3].click())
      .wait(500)
      .get('[data-cy=btn__options]')
      .then(dropdown => dropdown[1].click())
      .wait(500) // espera mostrar a box
      .get('[data-cy=select__option]').then(btn => btn[6].click())
      .wait(200)
      .get('[data-cy=usuario__projeto]')
      .wait(1000)
      .get(`[type=checkbox]#lista--${id}`).click({ force: true })
      .wait(1300)
  })

  it('Testar busca e seleção de usuário para cadastrar no projeto', () => {
    cy.get('[data-cy=btn__options]')
      .then(dropdown => dropdown[0].click())
      .wait(500) // espera mostrar a box
      .get('[data-cy=select__option]').then(btn => btn[3].click())
      .wait(500)
      .get('[data-cy=btn__options]')
      .then(dropdown => dropdown[1].click())
      .wait(500) // espera mostrar a box
      .get('[data-cy=select__option]').then(btn => btn[6].click())
      .wait(200)
      .get('[data-cy=search__usuario]').type(nome)
      .get(`input#lista--${id}`).click({ force: true })
  })
})

describe('Registro de novo usuário', () => {
  beforeEach(() => {
    cy.login('/admin/equipes')
  })

  it('Testar open formulario', () => {
    cy.get('[data-cy=open__create]').click()
  })

  it('Testar botão de cancelar', () => {
    cy.get('[data-cy=open__create]').click()
    cy.get('[data-cy=btn__cancel]').click()
  })

  it('Teste inputs', () => {
    cy.get('[data-cy=open__create]').click()
      .wait(300)
      .inputRandom('[data-cy=input__create]') // nome
      .inputRandom('[data-cy=input__email]')
      .inputRandom('[data-cy=input__nprodam]')
      .get('[data-cy=input__checkbox]').check()
  })

  it('Teste registro', () => {
    const apiUrl = `${Cypress.env('API_BASE_URL')}/usuarios`
    cy.get('[data-cy=open__create]').click()
      .wait(300)
      .inputRandom('[data-cy=input__create]') // nome
      .inputRandom('[data-cy=input__email]')
      .inputRandom('[data-cy=input__nprodam]')
      .get('[data-cy=input__checkbox]').check()
      .server()
      .route('POST', apiUrl, 'fixture:usuario.post').as('usuario')
      .get('[data-cy=btn__create]').click()
      .get('[data-cy=modal__title]').contains('Sucesso')
  })
})