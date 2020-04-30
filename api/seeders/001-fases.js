const now = new Date()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'fases',
      [
				{ nome: "1. Elementos Prévios", createdAt: now, updatedAt: now },
				{ nome: "2. Formulação", createdAt: now, updatedAt: now },
				{ nome: "3. Consolidação", createdAt: now, updatedAt: now },
				{ nome: "4. Forma Final do PIU", createdAt: now, updatedAt: now },
				{ nome: "5. Notas Técnicas", createdAt: now, updatedAt: now },
				{ nome: "6. Consulta Pública", createdAt: now, updatedAt: now },
				{ nome: "7. Reuniões Intersecretariais", createdAt: now, updatedAt: now },
				{ nome: "8. Apresentações", createdAt: now, updatedAt: now },
				{ nome: "9. Participação Social", createdAt: now, updatedAt: now },
				{ nome: "10. Acompanhemento Legislativo", createdAt: now, updatedAt: now },
				{ nome: "11. Comunicação", createdAt: now, updatedAt: now },
				{ nome: "12. Coordenação / Gerenciamento", createdAt: now, updatedAt: now },
				{ nome: "13. Projetos Especiais", createdAt: now, updatedAt: now }
			],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('fases', null, {})
  }
}
