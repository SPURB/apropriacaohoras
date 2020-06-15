const now = new Date()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'fases',
      [
        {
          nome: '1. Elementos Prévios',
          grupo: 3,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '2. Formulação',
          grupo: 3,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '3. Consolidação',
          grupo: 3,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '4. Forma Final do PIU',
          grupo: 3,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '5. Notas Técnicas',
          grupo: 3,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '6. Consulta Pública',
          grupo: 3,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '7. Reuniões Intersecretariais',
          grupo: 3,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '8. Apresentações',
          grupo: 3,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '9. Participação Social',
          grupo: 3,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '10. Acompanhemento Legislativo',
          grupo: 3,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '11. Comunicação',
          grupo: 3,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '12. Coordenação / Gerenciamento',
          grupo: 3,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '13. Projetos Especiais',
          grupo: 3,
          createdAt: now,
          updatedAt: now
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('fases', null, {})
  }
}
