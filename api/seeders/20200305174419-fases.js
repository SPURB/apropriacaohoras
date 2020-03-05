const now = new Date()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'fases',
      [
        { nome: 'Proposição', createdAt: now, updatedAt: now },
        { nome: 'Consulta Pública Inicial', createdAt: now, updatedAt: now },
        { nome: 'Avaliação', createdAt: now, updatedAt: now },
        { nome: 'Elaboração', createdAt: now, updatedAt: now },
        { nome: 'Discussão Pública', createdAt: now, updatedAt: now },
        { nome: 'Consolidação', createdAt: now, updatedAt: now },
        { nome: 'Encaminhamento Jurídico', createdAt: now, updatedAt: now },
        { nome: 'Suspenso', createdAt: now, updatedAt: now },
        { nome: 'Arquivado', createdAt: now, updatedAt: now },
        { nome: 'Em prospecção', createdAt: now, updatedAt: now },
        { nome: 'Vigente', createdAt: now, updatedAt: now },
        { nome: 'Processo administrativo', createdAt: now, updatedAt: now }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('fases', null, {})
  }
}
