const now = new Date()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'projetos',
      [
				{ nome: "PIU Bairros do Tamanduateí", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "PIU Jurubatuba", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "PIU Setor Central", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "PIU Arco Pinheiros", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "PIU Arco Tietê", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "PIU Arco Leste", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "PIU Eixos de Desenvolvimento", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "PIU Anhembi", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "PIU Pacaembu", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "PIU Nações Unidas", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "PIU Vila Olimpia", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "PIU Jockey Club", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "PIU Vila Leopoldina", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "PIU Terminal Princesa Isabel", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "PIU Terminal Campo Limpo", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "PIU Terminal Capelinha", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "PIU Minhocão", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "Projetos Estratégicos do Arco Faria Lima", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "Estudos de Viabilidade Imobiliária", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "Revisão Zonenamento", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "OUCAB ", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "Sistema de Monitoramento dos PIUs", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "Observatório Martinelli", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "OUCAB - Subsetor A1", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "Conselhos e Comissões", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "Coordenação", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "Gerenciamento", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "Férias", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "Falta abonada", ativo: 1, createdAt: now, updatedAt: now },
				{ nome: "Cursos", ativo: 1, createdAt: now, updatedAt: now }
			],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projetos', null, {})
  }
}
