const now = new Date()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'projetos',
      [
        { nome: 'PIU Rio Branco', ativo: 1, createdAt: now, updatedAt: now },
        { nome: 'PIU Vila Leopoldina', ativo: 1, createdAt: now, updatedAt: now },
        { nome: 'PIU Arco Tietê', ativo: 1, createdAt: now, updatedAt: now },
        { nome: 'PIU NESP', ativo: 1, createdAt: now, updatedAt: now },
        { nome: 'PIU Arco Jurubatuba', ativo: 1, createdAt: now, updatedAt: now },
        { nome: 'PIU Anhembi', ativo: 1, createdAt: now, updatedAt: now },
        { nome: 'PIU Pacaembu', ativo: 1, createdAt: now, updatedAt: now },
        { nome: 'PIU Vila Olímpia', ativo: 1, createdAt: now, updatedAt: now },
        { nome: 'PIU Nações Unidas', ativo: 1, createdAt: now, updatedAt: now },
        { nome: 'PIU Setor Central', ativo: 1, createdAt: now, updatedAt: now },
        { nome: 'PIU Arco Pinheiros', ativo: 1, createdAt: now, updatedAt: now },
        { nome: 'Bairros Tamanduateí', ativo: 1, createdAt: now, updatedAt: now },
        { nome: 'PIU Minhocão', ativo: 1, createdAt: now, updatedAt: now }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projetos', null, {})
  }
}
