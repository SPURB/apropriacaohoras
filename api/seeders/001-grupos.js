const now = new Date()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'grupos',
      [
        { nome: 'Planejamento da Paisagem', descricao: 'Projetos GPP', createdAt: now, updatedAt: now },
        { nome: 'Administrativo e Financeiro', descricao: 'Projetos da DAF', createdAt: now, updatedAt: now },
        { nome: 'Projetos de Intervenção Urbana', descricao: 'Decreto nº 56.901/2016', createdAt: now, updatedAt: now },
        { nome: 'Recursos Humanos', descricao: 'Férias, cursos, faltas abonadas', createdAt: now, updatedAt: now }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('grupos', null, {})
  }
}
