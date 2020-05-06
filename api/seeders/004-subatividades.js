const now = new Date()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'subatividades',
      [
        {
          nome: '1.1. Diagnóstico Socioterritorial',
          fase: 1,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '1.2. Diagnóstico Territorial',
          fase: 1,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '1.3. Programa de Interesse Público',
          fase: 1,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '1.3.1. Diretrizes Urbanísticas',
          fase: 1,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '1.3.2. Viabilidade da Transformação',
          fase: 1,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '1.3.3. Adensamento Populacional',
          fase: 1,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '1.3.4. Impactos Esperados',
          fase: 1,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '1.3.5. Modo de Gestão Democrática',
          fase: 1,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '2.1. Perímetro de Intervenção',
          fase: 2,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '2.2. Características Básicas da Proposta',
          fase: 2,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '2.3. Programa de Intervenções',
          fase: 2,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '2.4. Regramento Urbanísticos',
          fase: 2,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '2.5. Custos da Intervenção',
          fase: 2,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '2.6. Fincanciamento da Intervenção',
          fase: 2,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '2.7. Modelo de Gestão Democrática',
          fase: 2,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '3.1. Projeto de Intervenção Urbana',
          fase: 3,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '3.2. Minuta Projeto de Lei / Decreto',
          fase: 3,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '3.3. Mapas e Quadros',
          fase: 3,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '4.1. Instrumento Legal',
          fase: 4,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '4.2. Mapas e Quadros',
          fase: 4,
          createdAt: now,
          updatedAt: now
        },
        { nome: '4.3. Publicação', fase: 4, createdAt: now, updatedAt: now },
        {
          nome: '5.1. Nota Técnica Urbanística',
          fase: 5,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '5.2. Nota Técnica Jurídica',
          fase: 5,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '5.3. Nota Técnica Econômica',
          fase: 5,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '5.4. Nota Técnica Processo Participativo',
          fase: 5,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '6.1. Consulta Pública 1',
          fase: 6,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '6.1.1. Elaboração de Conteúdo de Consulta On-line',
          fase: 6,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '6.1.2. Sistematização das Contribuições',
          fase: 6,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '6.2. Consulta Pública 2',
          fase: 6,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '6.2.1. Elaboração de Apresentação de Audiência',
          fase: 6,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '6.2.2. Elaboração de Conteúdo de Consulta On-line',
          fase: 6,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '6.2.3. Sistematização das Contribuições',
          fase: 6,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '6.2.4. Audiências Públicas - Consulta Pública 2',
          fase: 6,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '6.3. Consulta Pública 3',
          fase: 6,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '6.3.1. Elaboração de Apresentação de Audiência',
          fase: 6,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '6.3.2. Elaboração de Conteúdo de Consulta On-line',
          fase: 6,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '6.3.3. Sistematização das Contribuições',
          fase: 6,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '6.3.4. Audiências Públicas. Consulta Pública 3',
          fase: 6,
          createdAt: now,
          updatedAt: now
        },
        { nome: '7.1. Reuniões', fase: 7, createdAt: now, updatedAt: now },
        { nome: '7.2. Atas', fase: 7, createdAt: now, updatedAt: now },
        { nome: '7.3. Relatório', fase: 7, createdAt: now, updatedAt: now },
        {
          nome: '8.1. Elaboração de Apresentações - Fases do Projeto',
          fase: 8,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '8.2. Elaboração de Apresentações para Conselhos',
          fase: 8,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '8.3. Apresentações em Conselhos',
          fase: 8,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '8.4. Elaboração de Apresentações Setoriais',
          fase: 8,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '8.5. Apresentações Setoriais',
          fase: 8,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '9.1. Estruturação de Reuniões Setoriais/Conselhos',
          fase: 9,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '9.2. Audiêcias Públicas - Consulta Pública 2',
          fase: 9,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '9.2.1. Estruturação das Audiêcias Públicas',
          fase: 9,
          createdAt: now,
          updatedAt: now
        },
        { nome: '9.2.2. Ata', fase: 9, createdAt: now, updatedAt: now },
        { nome: '9.2.3. Transcrição', fase: 9, createdAt: now, updatedAt: now },
        {
          nome: '9.2.4. Suporte técnico em Audiências',
          fase: 9,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '9.3. Audiêcias Públicas - Consulta Pública 3',
          fase: 9,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '9.3.1. Estruturação das Audiêcias Públicas',
          fase: 9,
          createdAt: now,
          updatedAt: now
        },
        { nome: '9.3.2. Ata', fase: 9, createdAt: now, updatedAt: now },
        { nome: '9.3.3. Transcrição', fase: 9, createdAt: now, updatedAt: now },
        {
          nome: '9.3.4. Suporte técnico em Audiências',
          fase: 9,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '9.4. Atividades Gerenciais - Participação Social',
          fase: 9,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '9.5. Reuniões - Modelo de Gestão',
          fase: 9,
          createdAt: now,
          updatedAt: now
        },
        { nome: '10.1. Reuniões', fase: 10, createdAt: now, updatedAt: now },
        {
          nome: '10.2. Elaboração técnica',
          fase: 10,
          createdAt: now,
          updatedAt: now
        },
        { nome: '11. Comunicação', fase: 11, createdAt: now, updatedAt: now },
        {
          nome: '12. Coordenação / Gerenciamento',
          fase: 12,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '12.1. Abertura de Processo SEI',
          fase: 12,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '12.2. Alimentação processo SEI / Solicitações Secretaria',
          fase: 12,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '13. Projetos Especiais',
          fase: 13,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '13.1. Análise Urbanística',
          fase: 13,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '13.2. Análise Jurídica',
          fase: 13,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '13.3. Análise Econômica',
          fase: 13,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '13.4. Gerenciamento',
          fase: 13,
          createdAt: now,
          updatedAt: now
        },
        {
          nome: '13.5. Reuniões Técnicas',
          fase: 13,
          createdAt: now,
          updatedAt: now
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subatividades', null, {})
  }
}
