const models = require('../src/models')
const Fase = models.fases
const Subatividade = models.subatividades

const now = new Date()

module.exports = {
  up: async (queryInterface, Sequelize) => {

		const toInsert = await Subatividade.findAll()
			.map(sub =>{
				return {
					fase: parseInt(sub.nome.substring(0,2).replace('.', '')),
					subatividade: sub.id,
					createdAt: now,
					updatedAt: now
				}
			})

		return queryInterface.bulkInsert(
      'fases_subatividades',
			toInsert,
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('fases_subatividades', null, {})
  }
}
